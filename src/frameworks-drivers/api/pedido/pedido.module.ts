import { Module } from "@nestjs/common";
import { IPedidoRepository } from "src/domain/pedido/ports/order-repository.interface";
import { OrderController } from "./controller/pedido.controller";
import { OrderMapper } from "../../../interface-adapters/presenters/pedido.mapper";
import { IProdutoRepository } from "src/domain/produto/ports/product-repository.interface";
import { ProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.service";
import { IProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.interface";
import { PedidoUseCase } from "src/domain/pedido/use-cases/pedido-use-case.service";
import { IPedidoUseCase } from "src/domain/pedido/use-cases/pedido-use-case.interface";
import { pedidoProviders } from "src/frameworks-drivers/data/pedido/repositories/pedido.provider";
import { databaseProviders } from "src/frameworks-drivers/data/database.provider";
import { PedidoRepository } from "src/frameworks-drivers/data/pedido/repositories/pedido.repository";
import { produtoProviders } from "src/frameworks-drivers/data/produto/repositories/produto.provider";
import { categoriaProviders } from "src/frameworks-drivers/data/produto/repositories/categoria.provider";
import { ProductRepository } from "src/frameworks-drivers/data/produto/repositories/produto-repository";
import { ProdutoGateway } from "src/interface-adapters/gateways/product-gateway";
import { IProdutoGateway } from "src/domain/produto/ports/product-gateway.interface";
import { PedidoGateway } from "src/interface-adapters/gateways/order-gateway";
import { IPedidoGateway } from "src/domain/pedido/ports/order-gateway.interface";

@Module({
    imports: [],
    controllers: [OrderController],
    providers: [
        OrderMapper,
        ...pedidoProviders,
        ...databaseProviders,
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
        },
        ProdutoGateway,
        {
            provide: IProdutoGateway,
            useClass: ProdutoGateway,
        },
        PedidoGateway,
        {
            provide: IPedidoGateway,
            useClass: PedidoGateway,
        }
    ],
  
})

export class PedidoModule{}