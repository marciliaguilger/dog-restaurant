export abstract class BaseComboProduct {
    private _productId: string;
    private _categoryId: string;
    private _price: number = 0;
    
    get productId(): string {
        return this._productId;
    }

    get price(): number {
        return this._price;
    }

    get categoryId(): string {
        return this._categoryId;
    }

    constructor(productId: string, categoryId: string, price: number) {
        this._productId = productId;
        this._price = price
        this._categoryId = categoryId
    }
}