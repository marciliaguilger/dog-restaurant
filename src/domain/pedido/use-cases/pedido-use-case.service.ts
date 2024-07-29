import { Inject, Injectable } from "@nestjs/common";
import { Pedido } from "../entities/pedido.entity";
import { IPedidoRepository } from "../repositories/order-repository.interface";
import { IPedidoUseCase } from "./pedido-use-case.interface";
import { Combo } from "../entities/combo.entity";
import { PedidoStatus } from "../enum/order-status.enum";
@Injectable()
export class PedidoUseCase implements IPedidoUseCase {
    constructor(
        @Inject(IPedidoRepository) 
        private readonly pedidoRepository: IPedidoRepository) {}

    async getAllPedidos(): Promise<Pedido[]> {
        const orders = await this.pedidoRepository.getAllPedidos();
        return this.filterAndSortPedidos(orders);
    }

    private filterAndSortPedidos(orders: Pedido[]): Pedido[] {
        return orders
            .filter(order => order.status !== PedidoStatus.DELIVERED)
            .sort((a, b) => {
                const statusPriority = {
                    [PedidoStatus.WAITING_DELIVERY]: 1,
                    [PedidoStatus.PREPARING]: 2,
                    [PedidoStatus.CONFIRMED]: 3
                };
    
                if (statusPriority[a.status] < statusPriority[b.status]) return -1;
                if (statusPriority[a.status] > statusPriority[b.status]) return 1;
    
                return a.criado.getTime() - b.criado.getTime();
            });
    }

    async getPedidoById(orderId: string): Promise<Pedido> {
        const order = await this.pedidoRepository.getPedidoById(orderId);
        if (!order) {
            throw new Error(`Pedido with ID ${orderId} not found.`);
        }
        return order;
    }

    async getPedidosByStatus(status: PedidoStatus): Promise<Pedido[]> {
        const orders = await this.pedidoRepository.getPedidosByStatus(status);
        return orders;
    }

    async updatePedidoStatus(orderId: string, newStatus: PedidoStatus) {
        let order = await this.pedidoRepository.getPedidoById(orderId);
        
        switch (newStatus) {
            case PedidoStatus.CONFIRMED: 
                order.confirmOrder()
                break;
            case PedidoStatus.PREPARING:
                order.startPreparation()
                break;
            case PedidoStatus.WAITING_DELIVERY:
                order.concludePreparation()
                break;
            case PedidoStatus.DELIVERED:
                order.deliverOder()
                break;
            case PedidoStatus.CANCELLED:
                order.cancelOrder()
                break;
            default:
                return
        }
        
        this.pedidoRepository.updatePedido(order)
    }    
    
    async payPedido(orderId: string): Promise<string> {
        const qrCode = 'qrCode'        
        let order = await this.pedidoRepository.getPedidoById(orderId);        
        order.confirmOrder()
        this.pedidoRepository.updatePedido(order)
        
        return qrCode
    }

    async createPedido(customerId:string, combos: Combo[]): Promise<string> {
        let order = new Pedido(customerId)
        order.createOrder()               
        order.addComboList(combos)
        this.pedidoRepository.createPedido(order)
        return order.pedidoId
    }
}