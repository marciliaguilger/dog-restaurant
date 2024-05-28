import { DomainException } from "src/domain/base/exception/domain.exception";
import { PedidoStatus } from "../enum/order-status.enum";
import { Combo } from "./combo.entity";
import { randomUUID } from "crypto";

export class Pedido {
    private _clienteId?: string;
    private _clienteName?: string;
    private _pedidoId: string;
    private _shortId: string;
    private _combos: Combo[] = [];
    private _criado: Date;
    private _preparacaoConcluida: Date;
    private _cancelado: Date;
    private _preparacaoIniciada?: Date;
    private _entregue?: Date;
    private _status: PedidoStatus;
    private _totalValor: number;
    private _descontoValor?: number;

    constructor(clienteId?: string) {
        this._clienteId = clienteId
    }

    public static buildOrder(
        pedidoId: string,
        shortId: string,
        criado: Date,
        preparacaoConcluida: Date,
        cancelado: Date,
        status: PedidoStatus,
        totalValor: number,
        clienteId?: string,
        clienteNome?: string,
        preparacaoIniciada?: Date,
        entregue?: Date,
        descontoValor?: number
    ): Pedido {
        const order = new Pedido();
        order._pedidoId = pedidoId;
        order._shortId = shortId;
        order._criado = criado;
        order._preparacaoConcluida = preparacaoConcluida;
        order._cancelado = cancelado;
        order._status = status;
        order._totalValor = totalValor;
        order._clienteId = clienteId;
        order._clienteName = clienteNome;
        order._preparacaoIniciada = preparacaoIniciada;
        order._entregue = entregue;
        order._descontoValor = descontoValor;
        return order;
    }

    get shortId(): string {
        return this._shortId
    }

    get pedidoId(): string {
        return this._pedidoId
    }

    get clienteId(): string {
        return this._clienteId;
    }

    get clienteNome(): string {
        return this._clienteName;
    }

    get combos(): Combo[] {
        return this._combos;
    }

    get criado(): Date {
        return this._criado
    }

    get entregue(): Date {
        return this._entregue
    }

    get preparacaoIniciada(): Date {
        return this._preparacaoIniciada
    }

    get status(): PedidoStatus {
        return this._status
    }

    get descontoValor(): number {
        return this._descontoValor
    }

    createOrder(){
        this._pedidoId = randomUUID()
        this._shortId = this._pedidoId.substring(0, 5)
        this._criado = new Date(Date.now())
        this._status = PedidoStatus.CREATED
        this._combos = []
    }

    confirmOrder() {
        if(this._status !== PedidoStatus.CREATED) 
            throw new DomainException('Ação não permitida');
        
        this._preparacaoIniciada = new Date(Date.now())
        this._status = PedidoStatus.CONFIRMED
    }

    startPreparation() {
        if(this._status !== PedidoStatus.CONFIRMED) 
            throw new DomainException('Ação não permitida');
        this._preparacaoIniciada = new Date(Date.now())
        this._status = PedidoStatus.PREPARING
    }

    concludePreparation() {
        if(this._status !== PedidoStatus.PREPARING)
            throw new DomainException('Ação não permitida');
        this._preparacaoConcluida = new Date(Date.now())
        this._status = PedidoStatus.WAITING_DELIVERY
    }

    deliverOder() {
        if(this._status !== PedidoStatus.WAITING_DELIVERY)
            throw new DomainException('Inicie a preparação do pedido antes de concluir')

        this._entregue = new Date(Date.now())
        this._status = PedidoStatus.DELIVERED
    }

    cancelOrder() {
        this._cancelado = new Date(Date.now())
        this._status = PedidoStatus.CANCELLED
    }

    calculateOrderTotalAmount(): number{
        let totalValor = 0 
        this._combos.forEach(c => {
            totalValor += c.comboAmount
        });
        this._totalValor = totalValor
        return this._totalValor
    }

    setDiscount(discount: number) {
        this.calculateOrderTotalAmount()

        if(discount > this._totalValor) 
            throw new DomainException('Desconto não pode exceder valor do pedido')

        this._descontoValor = discount;
        this.calculateOrderTotalAmount()
    }


    addCombo(combo: Combo) {
        combo.setOrderId(this._pedidoId)
        this._combos.push(combo);
        this.calculateOrderTotalAmount()
    }

    addComboList(comboList: Combo[]) {
        comboList.forEach(c => {
            c.setOrderId(this._pedidoId)
            this._combos.push(c)
        });
        this.calculateOrderTotalAmount()
    }

}