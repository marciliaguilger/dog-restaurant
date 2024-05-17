import { Inject, Injectable } from "@nestjs/common";
import { IProductUseCase } from "./product-use-case.interface";
import { Product } from "../entities/Product";
import { randomUUID } from "crypto";
import { IProductRepository } from "../repositories/product-repository.interface";
import { Categories } from "src/infrastructure/product/entities/category.entity";

@Injectable()
export class ProductUseCase implements IProductUseCase {
    constructor(
        @Inject(IProductRepository) 
        private readonly productRepository: IProductRepository) {}

        private readonly products: Product[] = [];

    async update(id: string, product: Product): Promise<string> {
        this.productRepository.update(id, product);
        return product.id;
    }
    getCategories(): Promise<Categories[]> {
        return this.productRepository.getAllCategories();
    }
        
      
    async create(product: Product): Promise<string> {
        product.id = randomUUID()

        this.productRepository.create(product);
        return product.id;
    }

    async getByName(name: string): Promise<Product> {
        return this.productRepository.getByName(name)
    }

    async getById(id: string): Promise<Product> {
        return this.productRepository.getById(id)
    }

    async getByCategory(category: string): Promise<Product[]> {
        return this.productRepository.getByCategory(category)

    }

    async getAll(): Promise<Product[]> {
        return this.products;
    }
}