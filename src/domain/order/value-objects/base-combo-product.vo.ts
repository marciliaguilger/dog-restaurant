export abstract class BaseComboProduct {
    private _productId: string;
    private _price: number;
    
    get productId(): string {
        return this._productId;
    }

    get price(): number {
        return this._price;
    }

    constructor(productId: string) {
        this._productId = productId;
    }
}