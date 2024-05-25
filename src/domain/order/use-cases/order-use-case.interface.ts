import { Combo } from "../entities/combo.entity";
import { Order } from "../entities/order.entity";
import { OrderStatus } from "../enum/order-status.enum";

export interface IOrderUseCase {
    getAllOrders(): Promise<Order[]> ;
    createOrder(customerId:string, combos: Combo[]) : Promise<string>
    payOrder(orderId: string, qrCode: string): Promise<boolean>
    getAllOrders() : Promise<Order[]>
    getOrderById(order: string) : Promise<Order>
    getOrdersByState(state: OrderStatus): Promise<Order[]>
    updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>
}

export const IOrderUseCase = Symbol('IOrderUseCase');