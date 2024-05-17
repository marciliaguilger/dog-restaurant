import { Categories } from "src/infrastructure/product/entities/category.entity";
import { Product } from "../entities/Product";

export interface IProductRepository{
    create(product: Product);
    update(id:string, product: Product);
    updateStatus(id:string, active: boolean);
    getByName(name: string): Promise<Product>;
    getById(id: string): Promise<Product>;
    getByCategory(category: string): Promise<Product[]>;
    getAllCategories():  Promise<Categories[]>;
}
export const IProductRepository = Symbol('IProductRepository');