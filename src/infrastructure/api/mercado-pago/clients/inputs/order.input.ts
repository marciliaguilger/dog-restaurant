import 'reflect-metadata';
import { Expose, Type} from 'class-transformer';
export class OrderPostInput {
    @Expose({ name: 'title' })
    title: string;

    @Expose({ name: 'total-amount' })
    totalAmount: number;

    @Expose({ name: 'external-reference' })
    externalReference: string;

    @Expose({ name: 'description' })
    description: string;

    @Expose({ name: 'items' })
    @Type(() => Item)
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

class Item {
    @Expose({ name: 'sku-number' })
    skuNumber: string;

    @Expose({ name: 'category' })
    category: string;

    @Expose({ name: 'title' })
    title: string;

    @Expose({ name: 'description' })
    description: string;

    @Expose({ name: 'unit-price' })
    unitPrice: number;

    @Expose({ name: 'quantity' })
    quantity: number;

    @Expose({ name: 'unit-measure' })
    unitMeasure: string;

    @Expose({ name: 'total-amount' })
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
