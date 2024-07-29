import { Payment } from "../entities/payment.entity";

export interface IMercadoPagoClient {
    postPayment(payment: Payment): Promise<PaymentResponse>;
}
