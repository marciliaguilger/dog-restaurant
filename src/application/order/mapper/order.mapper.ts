import { Combo } from "src/domain/order/entities/combo.entity";
import { ProductType } from "src/domain/order/enum/product-types.enum";
import { ComboInput } from "../dtos/input/create-order.input";

export class OrderMapper {

    static mapToCombo(createComboInput: ComboInput): Combo {
        const combo = new Combo();
        combo.addItem(ProductType.SANDWICH, createComboInput.sandwichId, OrderMapper.getProductPrice(createComboInput.sandwichId));
        combo.addItem(ProductType.DRINK, createComboInput.drinkId,OrderMapper.getProductPrice(createComboInput.drinkId));
        combo.addItem(ProductType.DESSERT, createComboInput.dessertId,OrderMapper.getProductPrice(createComboInput.dessertId));
        combo.addItem(ProductType.ACCOMPANIMENT, createComboInput.accompanimentId,OrderMapper.getProductPrice(createComboInput.accompanimentId));
        return combo;
    }

    static mapToComboList(comboInputList: ComboInput[]): Combo[] {
        const comboList: Combo[] = [];

        comboInputList.forEach(c => {
            comboList.push(OrderMapper.mapToCombo(c));
        });

        return comboList;
    }

    static getProductPrice(productId?: string): number {
        if(productId !== undefined) return 2 * Math.floor(Math.random() * 5) + 1;
    }
}