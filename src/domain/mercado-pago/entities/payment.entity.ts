export class OrderPostInput {
    title: string;
    totalAmount: number;
    externalReference: string;
    description: string;
    items: Item[];

    constructor(
        title: string,
        totalAmount: number,
        externalReference: string,
        description: string,
        items: Item[]
    ) {
        this.title = title;
        this.totalAmount = totalAmount;
        this.externalReference = externalReference;
        this.description = description;
        this.items = items;
    }
}

export class Item {
    skuNumber: string;
    category: string;
    title: string;
    description: string;
    unitPrice: number;
    quantity: number;
    unitMeasure: string;
    totalAmount: number;

    constructor(
        skuNumber: string,
        category: string,
        title: string,
        description: string,
        unitPrice: number,
        quantity: number,
        unitMeasure: string,
        totalAmount: number
    ) {
        this.skuNumber = skuNumber;
        this.category = category;
        this.title = title;
        this.description = description;
        this.unitPrice = unitPrice;
        this.quantity = quantity;
        this.unitMeasure = unitMeasure;
        this.totalAmount = totalAmount;
    }
}
  