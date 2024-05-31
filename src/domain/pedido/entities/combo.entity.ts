import { randomUUID } from "crypto";
import { Acompanhamento } from "../value-objects/acompanhamento.vo";
import { Sobremesa } from "../value-objects/sobremesa.vo";
import { Bebida } from "../value-objects/bebida.vo";
import { Lanche } from "../value-objects/lanche.vo";

export class Combo {
    private _pedidoId: string;
    private _comboId: string;
    private _lanche: Lanche;
    private _sobremesa: Sobremesa;
    private _bebida: Bebida;
    private _acompanhamento: Acompanhamento;

    get orderId(): string {
        return this._pedidoId;
    }

    get comboId(): string {
        return this._comboId;
    }

    get lanche(): Lanche {
        return this._lanche;
    }

    get sobremesa(): Sobremesa {
        return this._sobremesa;
    }

    get bebida(): Bebida {
        return this._bebida;
    }

    get acompanhamento(): Acompanhamento {
        return this._acompanhamento;
    }

    get comboAmount(): number {
      const items = [
        this._lanche?.preco || 0, 
        this._sobremesa?.preco || 0, 
        this._bebida?.preco || 0, 
        this._acompanhamento?.preco || 0
      ];
      const amount = items.reduce((total, item) => total + item, 0);
      return amount;
    }

    constructor (comboId?:string) {
      this._comboId = comboId === undefined ? randomUUID() : comboId
    }

    public setOrderId(orderId: string) {
      this._pedidoId = orderId;
    }

    addItem(categoria: string, produtoId: string, preco: number) {
      if (produtoId === undefined) return
        
      switch (categoria) {
            case 'Lanche':
              this._lanche = new Lanche(produtoId, categoria, preco);
              break;
            case 'Sobremesa':
              this._sobremesa =  new Sobremesa(produtoId, categoria, preco);
              break;
            case 'Bebida':
              this._bebida = new Bebida(produtoId, categoria, preco);
              break;
            case 'Acompanhamento':
                this._acompanhamento = new Acompanhamento(produtoId, categoria, preco)
                break;
            default:
              throw new Error('Tipo de produto não cadastrado')
          }
    }

    removeItem(categoria: string) {
        switch (categoria) {
            case 'Lanche':
              this._lanche = null
              break;
            case 'Sobremesa':
              this._sobremesa =  null
              break;
            case 'Bebida':
              this._bebida = null
              break;
            case 'Acompanhamento':
                this._acompanhamento = null
                break;
            default:
              throw new Error('Tipo de produto não cadastrado')
          }
    }
}