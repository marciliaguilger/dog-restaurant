import { Module } from "@nestjs/common";
import { IOrderRepository } from "src/domain/order/repositories/order-repository.interface";
import { IOrderUseCase } from "src/domain/order/use-cases/order-use-case.interface";
import { OrderUseCase } from "src/domain/order/use-cases/order-use-case.service";
import { databaseProviders } from "src/infrastructure/data/database.provider";
import { OrderRepository } from "src/infrastructure/data/order/repositories/order.repository";
import { OrderController } from "./controller/order.controller";
import { orderProviders } from "src/infrastructure/data/order/repositories/order.provider";

@Module({
    imports: [],
    controllers: [OrderController],
    providers: [
        ...orderProviders,
        ...databaseProviders,
        OrderUseCase,
        {
            provide: IOrderUseCase,
            useClass: OrderUseCase
        },
        OrderRepository,
        {
            provide: IOrderRepository,
            useClass: OrderRepository
        }
    ],
  
})

export class OrderModule{}