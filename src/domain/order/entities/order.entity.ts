import { DomainException } from "src/domain/base/exception/domain.exception";
import { OrderStatus } from "../enum/order-status.enum";
import { Combo } from "./combo.entity";
import { randomUUID } from "crypto";

export class Order {
    public _customerId?: string;
    public _customerName?: string;
    public _orderId: string;
    public _shortId: string;
    public _combos: Combo[] = [];
    public _createdAt: Date;
    //private confirmedAt: Date --analisar se faz sentido
    public _startedPreparationAt?: Date;
    public _deliveredAt?: Date;
    public _status: OrderStatus;
    public _totalAMount: number;
    public _discountAmount?: number;

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

    get discount(): number {
        return this._discountAmount
    }

    constructor(customerId?: string) {
        this._customerId = customerId
    }

    createOrder(){
        this._orderId = randomUUID()
        this._shortId = this._orderId.substring(0, 5)
        this._createdAt = new Date(Date.now())
        this._status = OrderStatus.CREATED
        this._combos = []
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

        this._status = OrderStatus.WAITING_DELIVERY
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