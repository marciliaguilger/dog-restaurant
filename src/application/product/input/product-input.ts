import { Category } from "src/domain/product/entities/Category";

export class ProductInput {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    active: boolean;
}