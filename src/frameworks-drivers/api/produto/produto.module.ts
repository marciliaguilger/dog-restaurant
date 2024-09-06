import { Module } from "@nestjs/common";
import { ProdutoController } from "./controller/produto.controller";
import { IProdutoRepository } from "src/domain/produto/ports/product-repository.interface";
import { ProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.service";
import { IProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.interface";
import { DataBaseModule } from "src/frameworks-drivers/data/database.module";
import { produtoProviders } from "src/frameworks-drivers/data/produto/repositories/produto.provider";
import { categoriaProviders } from "src/frameworks-drivers/data/produto/repositories/categoria.provider";
import { databaseProviders } from "src/frameworks-drivers/data/database.provider";
import { ProductRepository } from "src/frameworks-drivers/data/produto/repositories/produto-repository";
import { ProdutoGateway } from "src/interface-adapters/gateways/product-gateway";
import { IProdutoGateway } from "src/domain/produto/ports/product-gateway.interface";

@Module({
    imports: [DataBaseModule],
    controllers: [ProdutoController],
    providers: [
      ... produtoProviders,
      ...categoriaProviders,
      ... databaseProviders,
      ProductRepository,
      {
        provide: IProdutoRepository,
        useClass: ProductRepository
      },
      ProdutoUseCase,
      {
        provide: IProdutoUseCase,
        useClass: ProdutoUseCase,
      },
      ProdutoGateway,
      {
        provide: IProdutoGateway,
        useClass: ProdutoGateway,
      }
    ],
  })
  export class ProdutoModule {}
  