import { OrderStatus } from "src/domain/order/enum/order-status.enum";

export class UpdateOrderInput {
    status: OrderStatus
}