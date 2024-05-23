import { Module } from "@nestjs/common";
import { ProductController } from "./controller/product.controller";
import { IProductRepository } from "src/domain/product/repositories/product-repository.interface";
import { ProductUseCase } from "src/domain/product/use-cases/product-use-case.service";
import { IProductUseCase } from "src/domain/product/use-cases/product-use-case.interface";
import { DataBaseModule } from "src/infrastructure/data/database.module";
import { productProviders } from "src/infrastructure/data/product/repositories/product.provider";
import { categoryProviders } from "src/infrastructure/data/product/repositories/category.provider";
import { databaseProviders } from "src/infrastructure/data/database.provider";
import { ProductRepository } from "src/infrastructure/data/product/repositories/product-repository";

@Module({
    imports: [DataBaseModule],
    controllers: [ProductController],
    providers: [
      ... productProviders,
      ...categoryProviders,
      ... databaseProviders,
      ProductRepository,
      {
        provide: IProductRepository,
        useClass: ProductRepository
      },
      ProductUseCase,
      {
        provide: IProductUseCase,
        useClass: ProductUseCase,
      }
    ],
  })
  export class ProductModule {}
  