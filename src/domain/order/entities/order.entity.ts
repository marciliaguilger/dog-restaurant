import { DomainException } from "src/domain/base/exception/domain.exception";
import { OrderStatus } from "../enum/order-status.enum";
import { Combo } from "./combo.entity";
import { randomUUID } from "crypto";

export class Order {
    private _customerId?: string;
    private _customerName?: string;
    private _orderId: string;
    private _shortId: string;
    private _combos: Combo[] = [];
    private _createdAt: Date;
    private _preparationConcludedAt: Date;
    private _cancelledAt: Date;
    private _startedPreparationAt?: Date;
    private _deliveredAt?: Date;
    private _status: OrderStatus;
    private _totalAMount: number;
    private _discountAmount?: number;

    constructor(customerId?: string) {
        this._customerId = customerId
    }

    public static buildOrder(
        orderId: string,
        shortId: string,
        createdAt: Date,
        preparationConcludedAt: Date,
        cancelledAt: Date,
        status: OrderStatus,
        totalAmount: number,
        customerId?: string,
        customerName?: string,
        startedPreparationAt?: Date,
        deliveredAt?: Date,
        discountAmount?: number
    ): Order {
        const order = new Order();
        order._orderId = orderId;
        order._shortId = shortId;
        order._createdAt = createdAt;
        order._preparationConcludedAt = preparationConcludedAt;
        order._cancelledAt = cancelledAt;
        order._status = status;
        order._totalAMount = totalAmount;
        order._customerId = customerId;
        order._customerName = customerName;
        order._startedPreparationAt = startedPreparationAt;
        order._deliveredAt = deliveredAt;
        order._discountAmount = discountAmount;
        return order;
    }

    get shortId(): string {
        return this._shortId
    }

    get orderId(): string {
        return this._orderId
    }

    get customerId(): string {
        return this._customerId;
    }

    get customerName(): string {
        return this._customerName;
    }

    get combos(): Combo[] {
        return this._combos;
    }

    get createdAt(): Date {
        return this._createdAt
    }

    get deliveredAt(): Date {
        return this._deliveredAt
    }

    get startedPreparationAt(): Date {
        return this._startedPreparationAt
    }

    get status(): OrderStatus {
        return this._status
    }

    get discountAmount(): number {
        return this._discountAmount
    }

    createOrder(){
        this._orderId = randomUUID()
        this._shortId = this._orderId.substring(0, 5)
        this._createdAt = new Date(Date.now())
        this._status = OrderStatus.CREATED
        this._combos = []
    }

    confirmOrder() {
        if(this._status !== OrderStatus.CREATED) 
            throw new DomainException('Ação não permitida, pedido em: ${a}',);
        
        this._startedPreparationAt = new Date(Date.now())
        this._status = OrderStatus.CONFIRMED
    }

    startPreparation() {
        if(this._status !== OrderStatus.CONFIRMED) 
            throw new DomainException('Ação não permitida, pedido em: ${a}',);
            //TODO: CORRIGIR O STRING REPLACE
        
        this._startedPreparationAt = new Date(Date.now())
        this._status = OrderStatus.PREPARING
    }

    concludePreparation() {
        if(this._status !== OrderStatus.PREPARING)
            throw new DomainException('Inicie a preparação do pedido antes de concluir')
        this._preparationConcludedAt = new Date(Date.now())
        this._status = OrderStatus.WAITING_DELIVERY
    }

    deliverOder() {
        if(this._status !== OrderStatus.WAITING_DELIVERY)
            throw new DomainException('Inicie a preparação do pedido antes de concluir')

        this._deliveredAt = new Date(Date.now())
        this._status = OrderStatus.DELIVERED
    }

    cancelOrder() {
        this._cancelledAt = new Date(Date.now())
        this._status = OrderStatus.CANCELLED
    }

    calculateOrderTotalAmount(): number{
        let totalAmount = 0 
        this._combos.forEach(c => {
            totalAmount += c.comboAmount
        });
        this._totalAMount = totalAmount
        return this._totalAMount
    }

    setDiscount(discount: number) {
        this.calculateOrderTotalAmount()

        if(discount > this._totalAMount) 
            throw new DomainException('Desconto não pode exceder valor do pedido')

        this._discountAmount = discount;
        this.calculateOrderTotalAmount()
    }


    addCombo(combo: Combo) {
        combo.setOrderId(this._orderId)
        this._combos.push(combo);
        this.calculateOrderTotalAmount()
    }

    addComboList(comboList: Combo[]) {
        comboList.forEach(c => {
            c.setOrderId(this._orderId)
            this._combos.push(c)
        });
        this.calculateOrderTotalAmount()
    }

}