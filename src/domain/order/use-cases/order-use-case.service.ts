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

    async getAllOrders(): Promise<Combo[]> {
        const orders = await this.orderRepository.getAllOrders();
        return orders.map(order => order.combos).flat();
    }

    async getOrderById(orderId: string): Promise<Combo> {
        const order = await this.orderRepository.getOrderById(orderId);
        if (!order) {
            throw new Error(`Order with ID ${orderId} not found.`);
        }
        return order;
    }

    async getOrdersByState(state: OrderStatus): Promise<Combo[]> {
        const orders = await this.orderRepository.getOrdersByStatus(state);
        return orders.map(order => order.combos).flat();
    }
    
    async updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
        const order = await this.orderRepository.getOrderById(orderId);
        if (!order) {
            throw new Error(`Order with ID ${orderId} not found.`);
        }
        order.status = status;
        await this.orderRepository.updateOrder(order);
    }   
    
    async createOrder(customerId:string, combos: Combo[]): Promise<string> {
        let order = new Order(customerId)
        order.createOrder()        
        order.addComboList(combos)
        
        this.orderRepository.createOrder(order)
        return order.orderId
    }
}