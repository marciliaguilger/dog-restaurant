import { Product } from "../entities/Product";

export interface IManageProduct{
    create(product: Product): Promise<string>;
    getByName(name: string): Promise<Product>;
    getById(id: string): Promise<Product>;
    getByCategory(category: string): Promise<Product>;
    getAll(): Promise<Product[]>;
}

export const IManageProduct = Symbol('IManageProduct');
