import { Order } from "../entities/order.entity";

export interface IOrderRepository {
    createOrder(order: Order)
}

export const IOrderRepository = Symbol('IOrderRepository');