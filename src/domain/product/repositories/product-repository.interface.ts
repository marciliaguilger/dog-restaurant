import { Product } from "../entities/Product";

export interface IProductRepository{
    create(product: Product)    
}