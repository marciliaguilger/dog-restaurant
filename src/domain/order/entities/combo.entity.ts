import { randomUUID } from "crypto";
import { Accompaniment } from "../value-objects/accompaniment.vo";
import { Dessert } from "../value-objects/dessert.vo";
import { Drink } from "../value-objects/drink.vo";
import { Sandwich } from "../value-objects/sandwich.vo";

export class Combo {
    public _orderId: string;
    public _comboId: string;
    public _sandwich: Sandwich;
    public _dessert: Dessert;
    public _drink: Drink;
    public _accompaniment: Accompaniment;

    get orderId(): string {
        return this._orderId;
    }

    get comboId(): string {
        return this._comboId;
    }

    get sandwich(): Sandwich {
        return this._sandwich;
    }

    get dessert(): Dessert {
        return this._dessert;
    }

    get drink(): Drink {
        return this._drink;
    }

    get accompaniment(): Accompaniment {
        return this._accompaniment;
    }

    get comboAmount(): number {
      const items = [
        this.sandwich?.price || 0, 
        this.dessert?.price || 0, 
        this.drink?.price || 0, 
        this.accompaniment?.price || 0
      ];
      const amount = items.reduce((total, item) => total + item, 0);
      return amount;
    }

    constructor (comboId?:string) {
      this._comboId = comboId === undefined ? randomUUID() : comboId
    }

    public setOrderId(orderId: string) {
      this._orderId = orderId;
    }

    addItem(category: string, productId: string, price: number) {
      if (productId === undefined) return
        
      switch (category) {
            case 'Lanche':
              this._sandwich = new Sandwich(productId, category, price);
              break;
            case 'Sobremesa':
              this._dessert =  new Dessert(productId, category, price);
              break;
            case 'Bebida':
              this._drink = new Drink(productId, category, price);
              break;
            case 'Acompanhamento':
                this._accompaniment = new Accompaniment(productId, category, price)
                break;
            default:
              throw new Error('Tipo de produto não cadastrado')
          }
    }

    removeItem(category: string) {
        switch (category) {
            case 'Lanche':
              this._sandwich = null
              break;
            case 'Sobremesa':
              this._dessert =  null
              break;
            case 'Bebida':
              this._drink = null
              break;
            case 'Acompanhamento':
                this._accompaniment = null
                break;
            default:
              throw new Error('Tipo de produto não cadastrado')
          }
    }
}