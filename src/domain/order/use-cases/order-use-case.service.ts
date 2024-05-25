import { Inject, Injectable } from "@nestjs/common";
import { Order } from "../entities/order.entity";
import { IOrderRepository } from "../repositories/order-repository.interface";
import { IOrderUseCase } from "./order-use-case.interface";
import { Combo } from "../entities/combo.entity";
import { OrderStatus } from "../enum/order-status.enum";

@Injectable()
export class OrderUseCase implements IOrderUseCase {
    constructor(
        @Inject(IOrderRepository) 
        private readonly orderRepository: IOrderRepository) {}

    async getAllOrders(): Promise<Order[]> {
        const orders = await this.orderRepository.getAllOrders();
        return orders;
    }

    async getOrderById(orderId: string): Promise<Order> {
        const order = await this.orderRepository.getOrderById(orderId);
        if (!order) {
            throw new Error(`Order with ID ${orderId} not found.`);
        }
        return order;
    }

    async getOrdersByState(state: OrderStatus): Promise<Order[]> {
        const orders = await this.orderRepository.getOrdersByStatus(state);
        return orders;
    }
    
    async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {

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