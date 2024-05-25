import { Combo } from "../entities/combo.entity";

export interface IOrderUseCase {
    createOrder(customerId:string, combos: Combo[]) : Promise<string>
    updateOrderStatus(orderId: string, newStatus: string) 
    payOrder(orderId: string, qrCode: string): Promise<boolean>
}

export const IOrderUseCase = Symbol('IOrderUseCase');