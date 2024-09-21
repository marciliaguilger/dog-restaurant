import { Module } from "@nestjs/common";
import { IPedidoRepository } from "src/domain/pedido/repositories/order-repository.interface";
import { OrderController } from "./controller/pedido.controller";
import { OrderMapper } from "./mapper/pedido.mapper";
import { ProductRepository } from "src/infrastructure/data/produto/repositories/produto-repository";
import { IProdutoRepository } from "src/domain/produto/repositories/product-repository.interface";
import { ProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.service";
import { IProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.interface";
import { PedidoRepository } from "src/infrastructure/data/pedido/repositories/pedido.repository";
import { PedidoUseCase } from "src/domain/pedido/use-cases/pedido-use-case.service";
import { IPedidoUseCase } from "src/domain/pedido/use-cases/pedido-use-case.interface";

@Module({
    imports: [],
    controllers: [OrderController],
    providers: [
        OrderMapper,
        PedidoUseCase,
        {
            provide: IPedidoUseCase,
            useClass: PedidoUseCase
        },
        PedidoRepository,
        {
            provide: IPedidoRepository,
            useClass: PedidoRepository
        },
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

export class PedidoModule{}