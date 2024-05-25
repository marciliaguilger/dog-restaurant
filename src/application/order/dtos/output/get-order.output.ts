export class GetOrderOutput {
    orderId: string;
    customerId: string;
    customerName: string;
    createdAt: Date;
    status: string;
    combos: GetComboOutput[];
    totalAmount: number;
    discountAmount?: number;
}

export class GetComboOutput {
    comboId: string;
    items: ComboItemOutput[];
    comboAmount: number;
}

export class ComboItemOutput {
    productId: string;
    productType: string;
    price: number;
}