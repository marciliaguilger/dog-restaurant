import { Order } from "src/domain/order/entities/order.entity";
import { Orders } from "../entities/order.entity";
import { OrderCombos } from "../entities/order-combos.entity";
import { Combo } from "src/domain/order/entities/combo.entity";

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


    static mapToOrderCombo(combo: Combo): OrderCombos {
        let combos = new OrderCombos()

        return combos
    }

}