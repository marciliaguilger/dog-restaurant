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
    
    async updateOrderStatus(orderId: string, newStatus: OrderStatus) {
        let order = await this.orderRepository.getByOrderId(orderId);
        
        switch (newStatus) {
            case OrderStatus.CONFIRMED: 
                order.confirmOrder()
                break;
            case OrderStatus.PREPARING:
                order.startPreparation()
                break;
            case OrderStatus.WAITING_DELIVERY:
                order.concludePreparation()
                break;
            case OrderStatus.DELIVERED:
                order.deliverOder()
                break;
            case OrderStatus.CANCELLED:
                order.cancelOrder()
                break;
            default:
                return
        }
        
        this.orderRepository.updateOrder(order)
    }    
    
    async createOrder(customerId:string, combos: Combo[]): Promise<string> {
        let order = new Order(customerId)
        order.createOrder()        
        order.addComboList(combos)
        
        this.orderRepository.createOrder(order)
        return order.orderId
    }
}