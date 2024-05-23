import { Module } from "@nestjs/common";
import { IOrderRepository } from "src/domain/order/repositories/order-repository.interface";
import { IOrderUseCase } from "src/domain/order/use-cases/order-use-case.interface";
import { OrderUseCase } from "src/domain/order/use-cases/order-use-case.service";
import { databaseProviders } from "src/infrastructure/data/database.provider";
import { OrderRepository } from "src/infrastructure/data/order/repositories/order.repository";
import { OrderController } from "./controller/order.controller";
import { orderProviders } from "src/infrastructure/data/order/repositories/order.provider";
import { OrderMapper } from "./mapper/order.mapper";
import { ProductUseCase } from "src/domain/product/use-cases/product-use-case.service";
import { IProductUseCase } from "src/domain/product/use-cases/product-use-case.interface";
import { ProductRepository } from "src/infrastructure/data/product/repositories/product-repository";
import { IProductRepository } from "src/domain/product/repositories/product-repository.interface";
import { productProviders } from "src/infrastructure/data/product/repositories/product.provider";
import { categoryProviders } from "src/infrastructure/data/product/repositories/category.provider";

@Module({
    imports: [],
    controllers: [OrderController],
    providers: [
        OrderMapper,
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
        },
        ...productProviders,
        ...categoryProviders,
        ProductUseCase,
        {
            provide: IProductUseCase,
            useClass: ProductUseCase
        },
        ProductRepository,
        {
            provide: IProductRepository,
            useClass: ProductRepository
        }
    ],
  
})

export class OrderModule{}