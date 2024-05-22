import { Category } from "../entities/Category";
import { Product } from "../entities/Product";

export interface IProductUseCase{
    create(product: Product): Promise<string>;
    createCategory(category: Category): Promise<string>;
    update(id: string, product: Product): Promise<string>;
    updateStatus(id: string, active: boolean): Promise<string>;
    getByName(name: string): Promise<Product>;
    getById(id: string): Promise<Product>;
    getByCategory(category: string): Promise<Product[]>;
    getAll(): Promise<Product[]>;
    getAllCategories(): Promise<Category[]>;
}

export const IProductUseCase = Symbol('IProductUseCase');
