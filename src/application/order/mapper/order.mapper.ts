import { Combo } from "src/domain/order/entities/combo.entity";
import { ProductType } from "src/domain/order/enum/product-types.enum";
import { ComboInput } from "../dtos/input/create-order.input";
import { Inject, Injectable } from "@nestjs/common";
import { IProductUseCase } from "src/domain/product/use-cases/product-use-case.interface";
import { Order } from "src/domain/order/entities/order.entity";
import { ComboItemOutput, GetComboOutput, GetOrderOutput } from "../dtos/output/get-order.output";

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

    async mapToOrderDto(order: Order): Promise<GetOrderOutput> {
        const combosDto: GetComboOutput[] = order._combos.map(combo => {
            const itemsDto: ComboItemOutput[] = [];
    
            if (combo._sandwich) {
                itemsDto.push({
                    productId: combo._sandwich.productId,
                    productType: 'SANDWICH',
                    price: combo._sandwich.price,
                });
            }
            if (combo._dessert) {
                itemsDto.push({
                    productId: combo._dessert.productId,
                    productType: 'DESSERT',
                    price: combo._dessert.price,
                });
            }
            if (combo._drink) {
                itemsDto.push({
                    productId: combo._drink.productId,
                    productType: 'DRINK',
                    price: combo._drink.price,
                });
            }
            if (combo._accompaniment) {
                itemsDto.push({
                    productId: combo._accompaniment.productId,
                    productType: 'ACCOMPANIMENT',
                    price: combo._accompaniment.price,
                });
            }
    
            return {
                comboId: combo._comboId,
                items: itemsDto,
                comboAmount: combo.comboAmount,
            };
        });
    
        return {
            orderId: order._orderId,
            customerId: order._customerId,
            customerName: order._customerName,
            createdAt: order._createdAt,
            status: order._status,
            combos: combosDto,
            totalAmount: order.calculateOrderTotalAmount(),
            discountAmount: order._discountAmount,
        };
    }
}