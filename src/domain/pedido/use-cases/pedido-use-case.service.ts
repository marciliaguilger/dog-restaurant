import { Inject, Injectable } from "@nestjs/common";
import { Pedido } from "../entities/pedido.entity";
import { IPedidoUseCase } from "./pedido-use-case.interface";
import { Combo } from "../entities/combo.entity";
import { PedidoStatus } from "../enum/order-status.enum";
import { randomFill } from "crypto";
import { IPedidoGateway } from "../ports/order-gateway.interface";
@Injectable()
export class PedidoUseCase implements IPedidoUseCase {
    constructor(
        @Inject(IPedidoGateway) 
        private readonly pedidoGateway: IPedidoGateway) {}

    async getAllPedidos(): Promise<Pedido[]> {
        const orders = await this.pedidoGateway.getAllPedidos();
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
        const order = await this.pedidoGateway.getPedidoById(orderId);
        if (!order) {
            throw new Error(`Pedido with ID ${orderId} not found.`);
        }
        return order;
    }

    async getPedidosByStatus(status: PedidoStatus): Promise<Pedido[]> {
        const orders = await this.pedidoGateway.getPedidosByStatus(status);
        return orders;
    }

    async updatePedidoStatus(orderId: string, newStatus: PedidoStatus) {
        let order = await this.pedidoGateway.getPedidoById(orderId);
        
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
        
        this.pedidoGateway.updatePedido(order)
    }    
    
    async payPedido(orderId: string): Promise<string> {
        const qrCode = '00020101021243650016COM.MERCADOLIBRE02013063638f1192a-5fd1-4180-a180-8bcae3556bc35204000053039865802BR5925IZABEL AAAA DE MELO6007BARUERI62070503***63040B6D'      
        let order = await this.pedidoGateway.getPedidoById(orderId);        
        order.confirmOrder()
        this.pedidoGateway.updatePedido(order)
        
        return qrCode
    }

    async createPedido(customerId:string, combos: Combo[]): Promise<string> {
        let order = new Pedido(customerId)
        order.createOrder()               
        order.addComboList(combos)
        await this.pedidoGateway.createPedido(order)
        return order.pedidoId
    }
}