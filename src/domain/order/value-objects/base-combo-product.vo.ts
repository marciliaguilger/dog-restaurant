export abstract class BaseComboProduct {
    private _productId: string;
    private _price: number = 0;
    
    get productId(): string {
        return this._productId;
    }

    get price(): number {
        return this._price;
    }

    constructor(productId: string, price: number) {
        this._productId = productId;
        this._price = price
    }
}