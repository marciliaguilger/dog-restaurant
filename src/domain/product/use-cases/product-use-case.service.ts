import { Injectable } from "@nestjs/common";
import { IManageProduct } from "./product-use-case.interface";
import { Product } from "../entities/Product";
import { randomUUID } from "crypto";

@Injectable()
export class ProductService implements IManageProduct {
    private products: Product[] = [];

    async create(product: Product): Promise<string> {
        product.id = randomUUID()

        this.products.push(product);
        return product.id;
    }

    async getByName(name: string): Promise<Product> {
        const product = this.products.find(product => product.name === name);
        if (!product) {
            throw new Error(`Product with name ${name} not found`);
        }
        return product;
    }

    async getById(id: string): Promise<Product> {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new Error(`Product with id ${id} not found`);
        }
        return product;
    }

    async getByCategory(category: string): Promise<Product> {
        const product = this.products.find(product => product.category.name === category);
        if (!product) {
            throw new Error(`Product with category ${category} not found`);
        }
        return product;
    }

    async getAll(): Promise<Product[]> {
        return this.products;
    }
}