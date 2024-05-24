import { Order } from "../entities/order.entity";
import { OrderStatus } from "../enum/order-status.enum";

export interface IOrderRepository {
    createOrder(order: Order)
    getAllOrders()
    getOrderById(orderId: string)
    getOrdersByStatus(state: OrderStatus)
    updateOrder(order: Order)
}

export const IOrderRepository = Symbol('IOrderRepository');