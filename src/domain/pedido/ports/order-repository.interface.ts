import { Pedido } from "../entities/pedido.entity";
import { PedidoStatus } from "../enum/order-status.enum";

export interface IPedidoRepository {
    createPedido(order: Pedido)
    getAllPedidos(): Promise<Pedido[]>
    getPedidoById(orderId: string): Promise<Pedido>
    getPedidosByStatus(status: PedidoStatus): Promise<Pedido[]>
    updatePedido(order: Pedido)
}

export const IPedidoRepository = Symbol('IPedidoRepository');