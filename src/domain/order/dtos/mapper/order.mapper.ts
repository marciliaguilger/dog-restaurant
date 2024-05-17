import { Order } from "src/domain/order/entities/order.entity";
import { Combo } from "src/domain/order/entities/combo.entity";
import { ProductType } from "src/domain/order/enum/product-types.enum";
import { ComboInput, CreateOrderInput } from "../input/create-order.input";

export class OrderMapper {

    static mapToOrder(createOrderInput: CreateOrderInput): Order {
        return new Order(
            createOrderInput.customerId,
        );
    }

    static mapToCombo(createComboInput: ComboInput): Combo {
        const combo = new Combo();
        combo.addItem(ProductType.SANDWICH, createComboInput.sandwichId, createComboInput.sandwichPrice);
        combo.addItem(ProductType.DRINK, createComboInput.drinkId, createComboInput.drinkPrice);
        combo.addItem(ProductType.DESSERT, createComboInput.dessertId, createComboInput.dessertPrice);
        combo.addItem(ProductType.ACCOMPANIMENT, createComboInput.accompanimentId, createComboInput.accompanimentPrice);

        return combo;
    }

    static mapToComboList(comboInputList: ComboInput[]): Combo[] {
        const comboList: Combo[] = [];

        comboInputList.forEach(c => {
            comboList.push(OrderMapper.mapToCombo(c));
        });

        return comboList;
    }
}