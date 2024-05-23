import { BaseComboProduct } from "./base-combo-product.vo";

export class Accompaniment extends BaseComboProduct {
    constructor(productId: string, price: number)  {
        super(productId,price);
    }
}