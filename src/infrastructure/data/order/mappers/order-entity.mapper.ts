import { Order } from "src/domain/order/entities/order.entity";
import { Orders } from "../entities/order.entity";
import { Combo } from "src/domain/order/entities/combo.entity";
import { Ordercombos } from "../entities/order-combos.entity";
import { OrderStatus } from "src/domain/order/enum/order-status.enum";

export class OrderEntityMapper {

    static mapToOrderEntity(order: Order): Orders {
        let orders = new Orders()
        orders.OrderId = order.orderId
        orders.ShortId = order.shortId
        orders.CreatedAt = order.createdAt
        orders.DeliveredAt = order.deliveredAt
        orders.StartedPreparationAt = order.startedPreparationAt
        orders.OrderStatus = order.status.toString()
        orders.ClienteId = order.customerId
        orders.TotalAmountInCents = order.calculateOrderTotalAmount()
        orders.DiscountAmountInCents = order.discountAmount        
        return orders
    }

    static mapToOrderDomain(orderEntity: Orders): Order {
        const orderStatus = OrderStatus[orderEntity.OrderStatus as keyof typeof OrderStatus] || null;
        
        let order = Order.buildOrder(
            orderEntity.OrderId,
            orderEntity.ShortId,
            orderEntity.CreatedAt,
            orderEntity.PreparationConcludedAt,
            orderEntity.CancelledAt,
            orderStatus,
            orderEntity.TotalAmountInCents,
            orderEntity.ClienteId,
            null,
            orderEntity.StartedPreparationAt,
            orderEntity.DeliveredAt,
        )
        return order;
    }

    static mapToOrderComboDomain(orderCombos: Ordercombos[]): Combo[] {
        const comboMap = new Map<string, Combo>();

        for (const comboEntity of orderCombos) {
            let combo = comboMap.get(comboEntity.ComboId);
    
            if (!combo) {
                combo = new Combo(comboEntity.ComboId);
                combo.setOrderId(comboEntity.OrderId);
                comboMap.set(comboEntity.ComboId, combo);
            }
    
            combo.addItem(comboEntity.CategoryId, comboEntity.ProductId, comboEntity.PriceInCents);
        }
    
        return Array.from(comboMap.values());
    }

    static mapToOrderComboEntity(combo: Combo[]): Ordercombos[] {
        let combos: Ordercombos[] = []
        combo.forEach(c => {
            let mappedCombo = this.mapToCombo(c)
            mappedCombo.forEach(c => {
                combos.push(c)
            }) 
        });

        return combos
    }
    
    private static mapToCombo(combo: Combo): Ordercombos[] {
        let orderCombo: Ordercombos[] = []
        if(combo.sandwich?.productId !== undefined) {
            let product = new Ordercombos()
            product.ComboId = combo.comboId
            product.OrderId = combo.orderId
            product.ProductId = combo.sandwich.productId
            product.CategoryId = combo.sandwich.categoryId
            product.PriceInCents = combo.sandwich.price
            orderCombo.push(product)
        }

        if(combo.dessert?.productId !== undefined) {
            let product = new Ordercombos()
            product.ComboId = combo.comboId
            product.OrderId = combo.orderId
            product.ProductId = combo.dessert.productId
            product.CategoryId = combo.dessert.categoryId
            product.PriceInCents = combo.dessert.price
            orderCombo.push(product)
        }

        if(combo.accompaniment?.productId !== undefined){
            let product = new Ordercombos()
            product.ComboId = combo.comboId
            product.OrderId = combo.orderId
            product.ProductId = combo.accompaniment.productId
            product.CategoryId = combo.accompaniment.categoryId
            product.PriceInCents = combo.accompaniment.price
            orderCombo.push(product)
        }

        if(combo.drink?.productId !== undefined){
            let product = new Ordercombos()
            product.ComboId = combo.comboId
            product.OrderId = combo.orderId
            product.ProductId = combo.drink.productId
            product.CategoryId = combo.drink.categoryId
            product.PriceInCents = combo.drink.price
            orderCombo.push(product)
        }

        return orderCombo
    }
}