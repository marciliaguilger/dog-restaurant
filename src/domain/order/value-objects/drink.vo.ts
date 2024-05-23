import { BaseComboProduct } from "./base-combo-product.vo";

export class Drink extends BaseComboProduct {
    constructor(productId: string, price: number)  {
        super(productId,price);
    }
}