export class CreateOrderInput {
    customerId: string;
    combs: ComboInput[];
}


export class ComboInput {
    sandwichId?: string;
    sandwichPrice?: number;
    dessertId?: string;
    dessertPrice?: number;
    drinkId?: string;
    drinkPrice?: number;
    accompanimentId?: string;
    accompanimentPrice?: number;
}