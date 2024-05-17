import { Categories } from "src/infrastructure/product/entities/category.entity";
import { Product } from "../entities/Product";

export interface IProductUseCase{
    create(product: Product): Promise<string>;
    update(id: string, product: Product): Promise<string>;
    getByName(name: string): Promise<Product>;
    getById(id: string): Promise<Product>;
    getByCategory(category: string): Promise<Product[]>;
    getAll(): Promise<Product[]>;
    getAllCategories(): Promise<Categories[]>;
}

export const IProductUseCase = Symbol('IProductUseCase');
