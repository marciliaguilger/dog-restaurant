import { Combo } from "../entities/combo.entity";
import { Order } from "../entities/order.entity";
import { OrderStatus } from "../enum/order-status.enum";

export interface IOrderUseCase {
    createOrder(customerId:string, combos: Combo[]) : Promise<string>
    getAllOrders() : Promise<Combo[]>
    getOrderById(order: string) : Promise<Order>
    getOrdersByState(state: OrderStatus): Promise<Combo[]>
    updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>
}

export const IOrderUseCase = Symbol('IOrderUseCase');