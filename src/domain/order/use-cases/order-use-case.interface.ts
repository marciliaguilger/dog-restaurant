import { CreateOrderInput } from "../dtos/input/create-order.input";
import { UpdateOrderInput } from "../dtos/input/update-order.input";
import { Order } from "../entities/order.entity";

export interface IOrderUseCase {
    createOrder(createOrderInput: CreateOrderInput)
    updateOrderStatus(orderId: string, updateOrderInput: UpdateOrderInput)
}

export const IOrderUseCase = Symbol('IOrderUseCase');