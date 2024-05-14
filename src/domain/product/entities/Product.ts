import { Category } from "./Category";

export class Product {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;

    constructor(name: string, category:string, price: number, description: string) {
        if (!this.validateName(name)) throw new Error("Invalid name");
        if (!this.validateCategory(category)) throw new Error("Invalid category");
        if (!this.validatePrice(price)) throw new Error("Invalid price");
        if (!this.validateDescription(description)) throw new Error("Invalid description");

        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
    }

    private validateName(name: string): boolean {
        return name.trim().length > 3;
    }

    private validateCategory(category: string): boolean {
        return category.trim().length > 3;
    }

    private validatePrice(price: number): boolean {
        return price > 0;
    }

    private validateDescription(description: string): boolean {
        return description.trim().length > 5;
    }
}