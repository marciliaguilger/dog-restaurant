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

    async getAllOrders():Promise<Order[]>{
        let ordersReturn: Order[] = [];
        const ordersEntities = await this.orderRepo
            .createQueryBuilder("Orders")
            .getMany();

        for (const orderEntity of ordersEntities) {
            
            const combosEntities = await this.combosRepo
            .createQueryBuilder("OrderCombos")
            .where("OrderCombos.OrderId = :id", { id: orderEntity.OrderId })
            .getMany();

            let order = OrderEntityMapper.mapToOrderDomain(orderEntity)
            let orderCombos = OrderEntityMapper.mapToOrderComboDomain(combosEntities)
            order.addComboList(orderCombos);

            ordersReturn.push(order)
        }
        return ordersReturn

    }

    async getOrderById(orderId: string): Promise<Order> {
        try {
            const [orderEntity, combosEntities] = await Promise.all([
                this.orderRepo.createQueryBuilder("Orders")
                    .where("Orders.OrderId = :id", { id: orderId })
                    .getOne(),
                this.combosRepo.createQueryBuilder("OrderCombos")
                    .where("OrderCombos.OrderId = :id", { id: orderId })
                    .getMany(),
            ]);
    
            if (!orderEntity) {
                throw new Error(`Order with ID ${orderId} not found.`);
            }
    
            let order = OrderEntityMapper.mapToOrderDomain(orderEntity);
            let orderCombos = OrderEntityMapper.mapToOrderComboDomain(combosEntities);
            order.addComboList(orderCombos);
    
            return order;
        } catch (error) {
            console.error('Error fetching order by ID:', error);
            throw error;
        }
    }
    
    async getOrdersByStatus(state: OrderStatus): Promise<Order[]> {
        let ordersReturn: Order[] = [];
        const ordersEntities = await this.orderRepo
            .createQueryBuilder("Orders")
            .where("Orders.OrderStatus = :status", { status: state })
            .getMany();

        for (const orderEntity of ordersEntities) {
            
            const combosEntities = await this.combosRepo
            .createQueryBuilder("OrderCombos")
            .where("OrderCombos.OrderId = :id", { id: orderEntity.OrderId })
            .getMany();

            let order = OrderEntityMapper.mapToOrderDomain(orderEntity)
            let orderCombos = OrderEntityMapper.mapToOrderComboDomain(combosEntities)
            order.addComboList(orderCombos);

            ordersReturn.push(order)
        }
        return ordersReturn
    }
            
    updateOrder(order: Order) {
        let orders = OrderEntityMapper.mapToOrderEntity(order)
        this.orderRepo.save(orders)
    }
    
    createOrder(order: Order) {
        let orders = OrderEntityMapper.mapToOrderEntity(order)
        let combos = OrderEntityMapper.mapToOrderComboEntity(order.combos)
        this.orderRepo.save(orders)
        this.combosRepo.save(combos)
    }
}