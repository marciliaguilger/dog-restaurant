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
        combo.addItem(ProductType.Lanche, createComboInput.sandwichId, await this.getProductPrice(createComboInput.sandwichId));
        combo.addItem(ProductType.Bebida, createComboInput.drinkId,await this.getProductPrice(createComboInput.drinkId));
        combo.addItem(ProductType.Sobremesa, createComboInput.dessertId,await this.getProductPrice(createComboInput.dessertId));
        combo.addItem(ProductType.Acompanhamento, createComboInput.accompanimentId,await this.getProductPrice(createComboInput.accompanimentId));
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

    mapToOrderDto(order: Order): GetOrderOutput {
        const combosDto: GetComboOutput[] = order.combos.map(combo => {
            const itemsDto: ComboItemOutput[] = [];
    
            if (combo.sandwich) {
                itemsDto.push({
                    productId: combo.sandwich.productId,
                    productType: 'Lanche',
                    price: combo.sandwich.price,
                });
            }
            if (combo.dessert) {
                itemsDto.push({
                    productId: combo.dessert.productId,
                    productType: 'Sobremesa',
                    price: combo._dessert.price,
                });
            }
            if (combo.drink) {
                itemsDto.push({
                    productId: combo.drink.productId,
                    productType: 'Bebida',
                    price: combo.drink.price,
                });
            }
            if (combo.accompaniment) {
                itemsDto.push({
                    productId: combo.accompaniment.productId,
                    productType: 'Acompanhamento',
                    price: combo._accompaniment.price,
                });
            }
    
            return {
                comboId: combo.comboId,
                items: itemsDto,
                comboAmount: combo.comboAmount,
            };
        });
        
        let getOrderOutput = new GetOrderOutput()
        getOrderOutput.orderId = order.orderId,
        getOrderOutput.customerId= order.customerId,
        getOrderOutput.customerName= order.customerName,
        getOrderOutput.createdAt= order.createdAt,
        getOrderOutput.status=order.status,
        getOrderOutput.combos= combosDto,
        getOrderOutput.totalAmount= order.calculateOrderTotalAmount(),
        getOrderOutput.discountAmount =order.discountAmount
        return getOrderOutput;
    }
}