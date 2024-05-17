import { Inject, Injectable } from "@nestjs/common";
import { Order } from "src/domain/order/entities/order.entity";
import { IOrderRepository } from "src/domain/order/repositories/order-repository.interface";
import { Repository } from "typeorm";
import { Orders } from "../entities/order.entity";
import { OrderCombos } from "../entities/order-combos.entity";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepo: Repository<Orders>,
        @Inject('COMBOS_REPOSITORY')
        private combosRepo: Repository<OrderCombos>,
    ) {}
    
    
    createOrder(order: Order) {
        throw new Error("Method not implemented.");
    }
}