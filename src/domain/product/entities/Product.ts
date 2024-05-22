export class Product {
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    active:boolean;

    constructor(name: string, category:string, price: number, description: string, active?: boolean, id?: string) {
        if (!this.validateName(name)) throw new Error("Invalid name");
        if (!this.validatePrice(price)) throw new Error("Invalid price");
        if (!this.validateDescription(description)) throw new Error("Invalid description");

        this.name = name;
        this.category = category;
        this.price = price;
        this.description = description;
        this.active = active;
        this.id = id;
    }

    private validateName(name: string): boolean {
        return name.trim().length > 3;
    }

    private validatePrice(price: number): boolean {
        return price > 0;
    }

    private validateDescription(description: string): boolean {
        return description.trim().length > 5;
    }
}