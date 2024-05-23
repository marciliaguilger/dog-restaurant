import { Combo } from "src/domain/order/entities/combo.entity";
import { ProductType } from "src/domain/order/enum/product-types.enum";
import { ComboInput } from "../dtos/input/create-order.input";
import { Inject, Injectable } from "@nestjs/common";
import { IProductUseCase } from "src/domain/product/use-cases/product-use-case.interface";

@Injectable()
export class OrderMapper {
        constructor(@Inject(IProductUseCase) 
        private readonly productUseCase: IProductUseCase) {}

    async mapToCombo(createComboInput: ComboInput): Promise<Combo> {
        const combo = new Combo();
        combo.addItem(ProductType.SANDWICH, createComboInput.sandwichId, await this.getProductPrice(createComboInput.sandwichId));
        combo.addItem(ProductType.DRINK, createComboInput.drinkId,await this.getProductPrice(createComboInput.drinkId));
        combo.addItem(ProductType.DESSERT, createComboInput.dessertId,await this.getProductPrice(createComboInput.dessertId));
        combo.addItem(ProductType.ACCOMPANIMENT, createComboInput.accompanimentId,await this.getProductPrice(createComboInput.accompanimentId));
        return combo;
    }

    async mapToComboList(comboInputList: ComboInput[]): Promise<Combo[]> {
        const comboPromises = comboInputList.map(async (c) => {
            return this.mapToCombo(c);
        });
    
        return await Promise.all(comboPromises);
    }

    async getProductPrice(productId?: string): Promise<number> {
        let productPrice = 0
        if(productId === undefined) return productPrice
        productPrice = (await this.productUseCase.getById(productId))?.price
        return productPrice
    }
}