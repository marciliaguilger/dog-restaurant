import { Category } from "../entities/Category";
import { Product } from "../entities/Product";

export interface IProductRepository{
    create(product: Product);
    createCategory(category: Category);
    update(id:string, product: Product);
    updateStatus(id:string, active: boolean);
    getByName(name: string): Promise<Product>;
    getById(id: string): Promise<Product>;
    getByCategory(category: string): Promise<Product[]>;
    getAllCategories():  Promise<Category[]>;
    getAll(): Promise<Product[]>;
}
export const IProductRepository = Symbol('IProductRepository');