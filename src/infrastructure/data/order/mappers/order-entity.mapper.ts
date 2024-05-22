import { Order } from "src/domain/order/entities/order.entity";
import { Orders } from "../entities/order.entity";
import { Combo } from "src/domain/order/entities/combo.entity";
import { Ordercombos } from "../entities/order-combos.entity";

export class OrderEntityMapper {

    static mapToOrderEntity(order: Order): Orders {
        let orders = new Orders()
        orders.OrderId = order.orderId
        orders.ShortId = order.shortId
        orders.CreatedAt = order.createdAt
        orders.DeliveredAt = order.deliveredAt
        orders.StartedPreparationAt = order.startedPreparationAt
        orders.OrderStatus = order.status.toString()
        orders.CustomerName = order.customerName
        orders.CustomerId = order.customerId
        orders.TotalAmountInCents = order.calculateOrderTotalAmount()
        orders.DiscountAmountInCents = order.discount        
        return orders
    }


    static mapToOrderCombo(combo: Combo[]): Ordercombos[] {
        let combos: Ordercombos[] = []
        combo.forEach(c => {
            let mappedCombo = this.mapToCombo(c)
            mappedCombo.forEach(c => {
                combos.push(c)
            }) 
        });

        return combos
    }
    
    static mapToCombo(combo: Combo): Ordercombos[] {
        let orderCombo: Ordercombos[] = []
        if(combo.sandwich?.productId !== undefined) {
            let product = new Ordercombos()
            product.ComboId = combo.comboId
            product.OrderId = combo.orderId
            product.ProductId = combo.sandwich.productId
            product.PriceInCents = combo.sandwich.price
            orderCombo.push(product)
        }

        if(combo.dessert?.productId !== undefined) {
            let product = new Ordercombos()
            product.ComboId = combo.comboId
            product.OrderId = combo.orderId
            product.ProductId = combo.dessert.productId
            product.PriceInCents = combo.dessert.price
            orderCombo.push(product)
        }

        if(combo.accompaniment?.productId !== undefined){
            let product = new Ordercombos()
            product.ComboId = combo.comboId
            product.OrderId = combo.orderId
            product.ProductId = combo.accompaniment.productId
            product.PriceInCents = combo.accompaniment.price
            orderCombo.push(product)
        }

        if(combo.drink?.productId !== undefined){
            let product = new Ordercombos()
            product.ComboId = combo.comboId
            product.OrderId = combo.orderId
            product.ProductId = combo.drink.productId
            product.PriceInCents = combo.drink.price
            orderCombo.push(product)
        }

        return orderCombo
    }
}