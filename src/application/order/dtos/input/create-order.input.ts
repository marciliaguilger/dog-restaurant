export class CreateOrderInput {
    customerId: string;
    combs: ComboInput[];
}


export class ComboInput {
    sandwichId?: string;
    dessertId?: string;
    drinkId?: string;
    accompanimentId?: string;
}