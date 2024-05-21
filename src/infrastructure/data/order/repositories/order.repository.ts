import { Inject, Injectable } from "@nestjs/common";
import { Order } from "src/domain/order/entities/order.entity";
import { IOrderRepository } from "src/domain/order/repositories/order-repository.interface";
import { Repository } from "typeorm";
import { Orders } from "../entities/order.entity";
import { Ordercombos } from "../entities/order-combos.entity";
import { OrderEntityMapper } from "../mappers/order-entity.mapper";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepo: Repository<Orders>,
        @Inject('COMBOS_REPOSITORY')
        private combosRepo: Repository<Ordercombos>,
    ) {}
    
    
    createOrder(order: Order) {
        let orders = OrderEntityMapper.mapToOrderEntity(order)
        let combos = OrderEntityMapper.mapToOrderCombo(order.combos)
        this.orderRepo.create(orders)
        this.combosRepo.create(combos)
        this.orderRepo.save(orders)
        this.combosRepo.save(combos)
    }
}