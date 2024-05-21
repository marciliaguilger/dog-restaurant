import { Module } from "@nestjs/common";
import { ProductController } from "./controller/product.controller";
import { DataBaseModule } from "src/infrastructure/database/database.module";
import { productProviders } from "src/infrastructure/database/product/product.provider";
import { databaseProviders } from "src/infrastructure/database/database.provider";
import { ProductRepository } from "src/infrastructure/database/product/repositories/product-repository";
import { IProductRepository } from "src/domain/product/repositories/product-repository.interface";
import { ProductUseCase } from "src/domain/product/use-cases/product-use-case.service";
import { IProductUseCase } from "src/domain/product/use-cases/product-use-case.interface";
import { categoryProviders } from "src/infrastructure/database/product/category.provider";

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
  