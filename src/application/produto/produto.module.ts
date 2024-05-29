import { Module } from "@nestjs/common";
import { ProdutoController } from "./controller/produto.controller";
import { IProdutoRepository } from "src/domain/produto/repositories/product-repository.interface";
import { DataBaseModule } from "src/infrastructure/data/database.module";
import { produtoProviders } from "src/infrastructure/data/produto/repositories/produto.provider";
import { categoriaProviders } from "src/infrastructure/data/produto/repositories/categoria.provider";
import { databaseProviders } from "src/infrastructure/data/database.provider";
import { ProductRepository } from "src/infrastructure/data/produto/repositories/produto-repository";
import { ProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.service";
import { IProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.interface";

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
      }
    ],
  })
  export class ProdutoModule {}
  