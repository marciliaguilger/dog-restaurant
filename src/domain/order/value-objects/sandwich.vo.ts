import { BaseComboProduct } from "./base-combo-product.vo";

export class Sandwich extends BaseComboProduct {
    constructor(productId: string)  {
        super(productId);
    }
}