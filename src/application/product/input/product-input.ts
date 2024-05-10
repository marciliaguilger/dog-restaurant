import { Category } from "src/domain/product/entities/Category";

export class ProductInput {
    id: string;
    name: string;
    category: Category;
    price: number;
    description: string;
}