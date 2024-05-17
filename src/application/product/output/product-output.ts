export class ProductOutput {        
    id: string;
    name: string;
    category: string;
    price: number;
    description: string;
    
    constructor(name: string, id: string, category: string, price: number, description: string) {
        this.name = name;
        this.id = id;
        this.category = category;
        this.price = price;
        this.description = description;
    }
}