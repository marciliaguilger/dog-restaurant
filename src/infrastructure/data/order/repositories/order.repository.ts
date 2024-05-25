import { Inject, Injectable } from "@nestjs/common";
import { Order } from "src/domain/order/entities/order.entity";
import { IOrderRepository } from "src/domain/order/repositories/order-repository.interface";
import { Repository } from "typeorm";
import { Orders } from "../entities/order.entity";
import { Ordercombos } from "../entities/order-combos.entity";
import { OrderEntityMapper } from "../mappers/order-entity.mapper";
import { OrderStatus } from "src/domain/order/enum/order-status.enum";

@Injectable()
export class OrderRepository implements IOrderRepository {
    constructor(
        @Inject('ORDER_REPOSITORY')
        private orderRepo: Repository<Orders>,
        @Inject('COMBOS_REPOSITORY')
        private combosRepo: Repository<Ordercombos>,
    ) {}

    async getAllOrders(): Promise<Order[]>{
        const ordersEntities = await this.orderRepo
            .createQueryBuilder("Orders")
            .getMany();
    
        const ordersWithCombos = await Promise.all(ordersEntities.map(async (orderEntity) => {
            const combosEntities = await this.orderRepo
                .createQueryBuilder("OrderCombos")
                .where("OrderCombos.OrderId = :id", { id: orderEntity.OrderId })
                .getMany();
    
            return OrderEntityMapper.mapToOrderDomain(orderEntity, combosEntities);
        }));
    
        return ordersWithCombos;    }

    async getOrderById(orderId: string) : Promise<Order> {
        const orderEntity = await this.orderRepo
        .createQueryBuilder("Orders")
        .where("Orders.OrderId = :id", { id: orderId })
        .getOne();

        const combosEntities = await this.orderRepo
        .createQueryBuilder("OrderCombos")
        .where("OrderCombos.OrderId = :id", { id: orderId })
        .getMany();

        return OrderEntityMapper.mapToOrderDomain(orderEntity, combosEntities);
    }
    
    async getOrdersByStatus(state: OrderStatus): Promise<Order[]> {
        const ordersEntities = await this.orderRepo
            .createQueryBuilder("Orders")
            .where("Orders.OrderStatus = :status", { status: state })
            .getMany();
    
        const ordersWithCombos = await Promise.all(ordersEntities.map(async (orderEntity) => {
            const combosEntities = await this.orderRepo
                .createQueryBuilder("OrderCombos")
                .where("OrderCombos.OrderId = :id", { id: orderEntity.OrderId })
                .getMany();
    
            return OrderEntityMapper.mapToOrderDomain(orderEntity, combosEntities);
        }));
    
        return ordersWithCombos;
    }
            
    updateOrder(order: Order) {
        throw new Error("Method not implemented.");
    }
    
    
    createOrder(order: Order) {
        let orders = OrderEntityMapper.mapToOrderEntity(order)
        let combos = OrderEntityMapper.mapToOrderCombo(order.combos)
        this.orderRepo.create(orders)
        this.combosRepo.create(combos)
        this.orderRepo.save(orders)
        this.combosRepo.save(combos)
    }
}