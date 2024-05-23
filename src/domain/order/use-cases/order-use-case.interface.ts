import { Combo } from "../entities/combo.entity";

export interface IOrderUseCase {
    createOrder(customerId:string, combos: Combo[]) : Promise<string>
    updateOrderStatus(orderId: string)
}

export const IOrderUseCase = Symbol('IOrderUseCase');