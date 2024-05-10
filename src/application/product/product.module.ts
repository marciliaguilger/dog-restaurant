import { Module } from "@nestjs/common";
import { ProductController } from "./controller/product.controllet";
import { ProductService } from "src/domain/product/use-cases/product-use-case.service";
import { IManageProduct } from "src/domain/product/use-cases/product-use-case.interface";

@Module({
    imports: [],
    controllers: [ProductController],
    providers: [
      ProductService,
      {
        provide: IManageProduct,
        useClass: ProductService,
      }
    ],
  })
  export class ProductModule {}
  