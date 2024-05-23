import { Inject, Injectable } from "@nestjs/common";
import { Order } from "../entities/order.entity";
import { IOrderRepository } from "../repositories/order-repository.interface";
import { IOrderUseCase } from "./order-use-case.interface";
import { Combo } from "../entities/combo.entity";

@Injectable()
export class OrderUseCase implements IOrderUseCase {
    constructor(
        @Inject(IOrderRepository) 
        private readonly orderRepository: IOrderRepository) {}
    
    updateOrderStatus(orderId: string) {
        throw new Error("Method not implemented.");
    }    
    
    async createOrder(customerId:string, combos: Combo[]): Promise<string> {
        let order = new Order(customerId)
        order.createOrder()        
        order.addComboList(combos)
        
        this.orderRepository.createOrder(order)
        return order.orderId
    }
}