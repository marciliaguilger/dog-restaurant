import { Inject, Injectable } from "@nestjs/common";
import { Order } from "../entities/order.entity";
import { IOrderRepository } from "../repositories/order-repository.interface";
import { IOrderUseCase } from "./order-use-case.interface";
import { CreateOrderInput } from "../dtos/input/create-order.input";
import { OrderMapper } from "../dtos/mapper/order.mapper";
import { UpdateOrderInput } from "../dtos/input/update-order.input";

@Injectable()
export class OrderUseCase implements IOrderUseCase {
    constructor(
        @Inject(IOrderRepository) 
        private readonly orderRepository: IOrderRepository) {}
    
    updateOrderStatus(orderId: string, updateOrderInput: UpdateOrderInput) {
        throw new Error("Method not implemented.");
    }
    
    async createOrder(createOrderInput: CreateOrderInput) {
        let order = new Order(createOrderInput.customerId)
        order.createOrder()
        order.addComboList(OrderMapper.mapToComboList(createOrderInput.combs))
        this.orderRepository.createOrder(order)
    }

}