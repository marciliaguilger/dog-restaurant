import { Inject, Injectable } from "@nestjs/common";
import { IProductUseCase } from "./product-use-case.interface";
import { Product } from "../entities/Product";
import { randomUUID } from "crypto";
import { IProductRepository } from "../repositories/product-repository.interface";
import { Category } from "../entities/Category";

@Injectable()
export class ProductUseCase implements IProductUseCase {
    constructor(
        @Inject(IProductRepository) 
        private readonly productRepository: IProductRepository
    ) {}

    async updateStatus(id: string, active: boolean): Promise<string> {
        this.productRepository.updateStatus(id, active);
        return id;
    }

    async getAllCategories(): Promise<Category[]> {
        const categories = await this.productRepository.getAllCategories();    
        return categories;
    }

    async update(id: string, product: Product): Promise<string> {
        this.productRepository.update(id, product);
        return id;
    }
              
    async create(product: Product): Promise<string> {
        product.id = randomUUID()

        this.productRepository.create(product);
        return product.id;
    }

    async createCategory(category: Category): Promise<string> {
        category.id = randomUUID();

        this.productRepository.createCategory(category);
        return category.id;
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
        const products = await this.productRepository.getAll()    
        return products;    
    }
}