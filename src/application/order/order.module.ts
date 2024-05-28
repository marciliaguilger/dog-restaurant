import { Module } from "@nestjs/common";
import { IOrderRepository } from "src/domain/order/repositories/order-repository.interface";
import { IOrderUseCase } from "src/domain/order/use-cases/order-use-case.interface";
import { OrderUseCase } from "src/domain/order/use-cases/order-use-case.service";
import { databaseProviders } from "src/infrastructure/data/database.provider";
import { OrderRepository } from "src/infrastructure/data/order/repositories/order.repository";
import { OrderController } from "./controller/order.controller";
import { orderProviders } from "src/infrastructure/data/order/repositories/order.provider";
import { OrderMapper } from "./mapper/order.mapper";
import { ProductRepository } from "src/infrastructure/data/produto/repositories/produto-repository";
import { IProdutoRepository } from "src/domain/produto/repositories/product-repository.interface";
import { produtoProviders } from "src/infrastructure/data/produto/repositories/produto.provider";
import { categoriaProviders } from "src/infrastructure/data/produto/repositories/categoria.provider";
import { ProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.service";
import { IProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.interface";

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
        ...produtoProviders,
        ...categoriaProviders,
        ProdutoUseCase,
        {
            provide: IProdutoUseCase,
            useClass: ProdutoUseCase
        },
        ProductRepository,
        {
            provide: IProdutoRepository,
            useClass: ProductRepository
        }
    ],
  
})

export class OrderModule{}