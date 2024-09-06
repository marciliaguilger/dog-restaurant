import { Inject, Injectable } from "@nestjs/common";
import { IPedidoRepository } from "src/domain/pedido/ports/order-repository.interface";
import { Repository } from "typeorm";
import { Pedidos } from "../entities/pedido.entity";
import { Pedidoscombos } from "../entities/pedido-combos.entity";
import { OrderEntityMapper } from "../mappers/pedido-entity.mapper";
import { PedidoStatus } from "src/domain/pedido/enum/order-status.enum";
import { Pedido } from "src/domain/pedido/entities/pedido.entity";
import { Clientes } from "../../cliente/entities/customer.entity";

@Injectable()
export class PedidoRepository implements IPedidoRepository {
    constructor(
        @Inject('PEDIDO_REPOSITORY')
        private orderRepo: Repository<Pedidos>,
        @Inject('COMBOS_REPOSITORY')
        private combosRepo: Repository<Pedidoscombos>,
        @Inject('CLIENTE_REPOSITORY')
        private clienteRepo: Repository<Clientes>,
    ) {}

    async getAllPedidos():Promise<Pedido[]>{
        let ordersReturn: Pedido[] = [];
        const ordersEntities = await this.orderRepo
            .createQueryBuilder("Pedidos")
            .getMany();

        for (const orderEntity of ordersEntities) {
            
            const combosEntities = await this.combosRepo
            .createQueryBuilder("PedidosCombos")
            .where("PedidosCombos.PedidoId = :id", { id: orderEntity.PedidoId })
            .getMany();
            
            let clientePedido = await this.clienteRepo.createQueryBuilder("Clientes")
            .where("Clientes.ClienteId = :clienteId", { clienteId: await orderEntity.ClienteId })
            .getOne()

            let order = OrderEntityMapper.mapToOrderDomain(orderEntity, clientePedido.ClienteNome)
            let orderCombos = OrderEntityMapper.mapToOrderComboDomain(combosEntities)
            order.addComboList(orderCombos);

            ordersReturn.push(order)
        }
        return ordersReturn

    }

    async getPedidoById(pedidoId: string): Promise<Pedido> {
        try {
            const [orderEntity, combosEntities] = await Promise.all([
                this.orderRepo.createQueryBuilder("Pedidos")
                    .where("Pedidos.PedidoId = :id", { id: pedidoId })
                    .getOne(),
                this.combosRepo.createQueryBuilder("PedidosCombos")
                    .where("PedidosCombos.PedidoId = :id", { id: pedidoId })
                    .getMany(),
            ]);
    
            if (!orderEntity) {
                throw new Error(`Pedido with ID ${pedidoId} not found.`);
            }
            
            let clientePedido = await this.clienteRepo.createQueryBuilder("Clientes")
            .where("Clientes.ClienteId = :clienteId", { clienteId: await orderEntity.ClienteId })
            .getOne()
            
            console.log(clientePedido)
            console.log(combosEntities)

            let order = OrderEntityMapper.mapToOrderDomain(orderEntity, clientePedido.ClienteNome);
            let orderCombos = OrderEntityMapper.mapToOrderComboDomain(combosEntities);
            order.addComboList(orderCombos);
    
            return order;
        } catch (error) {
            console.error('Error fetching order by ID:', error);
            throw error;
        }
    }
    
    async getPedidosByStatus(status: PedidoStatus): Promise<Pedido[]> {
        let ordersReturn: Pedido[] = [];
        const ordersEntities = await this.orderRepo
            .createQueryBuilder("Pedidos")
            .where("Pedidos.PedidoStatus = :status", { status: status })
            .getMany();

        for (const orderEntity of ordersEntities) {
            
            const combosEntities = await this.combosRepo
            .createQueryBuilder("PedidosCombos")
            .where("PedidosCombos.PedidoId = :id", { id: orderEntity.PedidoId })
            .getMany();

            let clientePedido = await this.clienteRepo.createQueryBuilder("Clientes")
            .where("Clientes.ClienteId = :clienteId", { clienteId: await orderEntity.ClienteId })
            .getOne()

            let order = OrderEntityMapper.mapToOrderDomain(orderEntity, clientePedido.ClienteNome)
            let orderCombos = OrderEntityMapper.mapToOrderComboDomain(combosEntities)
            order.addComboList(orderCombos);

            ordersReturn.push(order)
        }
        return ordersReturn
    }
            
    updatePedido(order: Pedido) {
        let orders = OrderEntityMapper.mapToOrderEntity(order)
        this.orderRepo.save(orders)
    }
    
    async createPedido(order: Pedido) {
        let orders = OrderEntityMapper.mapToOrderEntity(order)
        let combos = OrderEntityMapper.mapToOrderComboEntity(order.combos)
        await this.orderRepo.save(orders)
        await this.combosRepo.save(combos)
    }
}