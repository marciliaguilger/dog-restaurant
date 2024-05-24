export class CreateOrderInput {
    customerId: string;
    combos: ComboInput[];
}


export class ComboInput {
    sandwichId?: string;
    dessertId?: string;
    drinkId?: string;
    accompanimentId?: string;
}