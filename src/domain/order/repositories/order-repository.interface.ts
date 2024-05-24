import { Order } from "../entities/order.entity";

export interface IOrderRepository {
    createOrder(order: Order)
    getByOrderId(orderId: string): Promise<Order>
    updateOrder(order: Order)
}

export const IOrderRepository = Symbol('IOrderRepository');