import { Module } from "@nestjs/common";
import { ProdutoController } from "./controller/produto.controller";
import { IProdutoRepository } from "src/domain/produto/repositories/product-repository.interface";
import { ProductRepository } from "src/infrastructure/data/produto/repositories/produto-repository";
import { ProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.service";
import { IProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.interface";

@Module({
    controllers: [ProdutoController],
    providers: [
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
  