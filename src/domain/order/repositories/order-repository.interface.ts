import { Order } from "../entities/order.entity";
import { OrderStatus } from "../enum/order-status.enum";

export interface IOrderRepository {
    createOrder(order: Order)
    getAllOrders(): Promise<Order[]>
    getOrderById(orderId: string): Promise<Order>
    getOrdersByStatus(state: OrderStatus): Promise<Order[]>
    updateOrder(order: Order)
}

export const IOrderRepository = Symbol('IOrderRepository');