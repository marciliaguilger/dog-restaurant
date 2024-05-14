import { Product } from "../entities/Product";

export interface IProductRepository{
    create(product: Product);
    getByName(name: string): Promise<Product>;
    getById(id: string): Promise<Product>;
    getByCategory(category: string): Promise<Product[]>;
}
export const IProductRepository = Symbol('IProductRepository');