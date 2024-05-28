import { Combo } from "../entities/combo.entity";
import { Pedido } from "../entities/pedido.entity";
import { PedidoStatus } from "../enum/order-status.enum";

export interface IPedidoUseCase {
    getAllPedidos(): Promise<Pedido[]> ;
    createPedido(customerId:string, combos: Combo[]) : Promise<string>
    payPedido(orderId: string, qrCode: string): Promise<boolean>
    getAllPedidos() : Promise<Pedido[]>
    getPedidoById(order: string) : Promise<Pedido>
    getPedidosByStatus(state: PedidoStatus): Promise<Pedido[]>
    updatePedidoStatus(orderId: string, status: PedidoStatus): Promise<void>
}

export const IPedidoUseCase = Symbol('IPedidoUseCase');