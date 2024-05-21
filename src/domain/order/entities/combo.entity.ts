import { randomUUID } from "crypto";
import { Accompaniment } from "../value-objects/accompaniment.vo";
import { Dessert } from "../value-objects/dessert.vo";
import { Drink } from "../value-objects/drink.vo";
import { Sandwich } from "../value-objects/sandwich.vo";

export class Combo {
    private _orderId: string;
    private _comboId: string;
    private _sandwich: Sandwich;
    private _dessert: Dessert;
    private _drink: Drink;
    private _accompaniment: Accompaniment;

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
      const amount = this.sandwich.price + this._dessert.price + this._drink.price + this._accompaniment.price
      return this.sandwich.price + this._dessert.price + this._drink.price + this._accompaniment.price
    }

    constructor (){
      this._comboId = randomUUID()
    }

    setOrderId(orderId: string) {
      this._orderId = orderId;
    }

    addItem(productType: string, productId: string, price: number) {
        switch (productType) {
            case 'SANDWICH':
              this._sandwich = new Sandwich(productId, price);
              break;
            case 'DESSERT':
              this._dessert =  new Dessert(productId, price);
              break;
            case 'DRINK':
              this._drink = new Drink(productId, price);
              break;
            case 'ACCOMPANIMENT':
                this._accompaniment = new Accompaniment(productId, price)
                break;
            default:
              throw new Error('Tipo de produto não cadastrado')
          }
    }

    removeItem(productType: string) {
        switch (productType) {
            case 'SANDWICH':
              this._sandwich = null
              break;
            case 'DESSERT':
              this._dessert =  null
              break;
            case 'DRINK':
              this._drink = null
              break;
            case 'ACCOMPANIMENT':
                this._accompaniment = null
                break;
            default:
              throw new Error('Tipo de produto não cadastrado')
          }
    }
}