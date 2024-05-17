import { Accompaniment } from "../value-objects/accompaniment.vo";
import { Dessert } from "../value-objects/dessert.vo";
import { Drink } from "../value-objects/drink.vo";
import { Sandwich } from "../value-objects/sandwich.vo";

export class Combo {
    private _sandwich: Sandwich;
    private _dessert: Dessert;
    private _drink: Drink;
    private _accompaniment: Accompaniment;

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
      return this.sandwich.price + this._dessert.price + this._drink.price + this._accompaniment.price
    }

    addItem(productType: string, productId: string) {
        switch (productType) {
            case 'SANDWICH':
              this._sandwich = new Sandwich(productId);
              break;
            case 'DESSERT':
              this._dessert =  new Dessert(productId);
              break;
            case 'DRINK':
              this._drink = new Drink(productId);
              break;
            case 'ACCOMPANIMENT':
                this._accompaniment = new Accompaniment(productId)
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