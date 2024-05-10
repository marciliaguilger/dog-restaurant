import { Product } from "src/domain/product/entities/Product";
import { IProductRepository } from "src/domain/product/repositories/product-repository.interface";

export class ProductRepository implements IProductRepository {
    create(product: Product) {
        throw new Error("Method not implemented.");
    }
}