import { PaymentOutput } from "src/infrastructure/api/mercado-pago/clients/outputs/payment.output";
import { OrderPostInput } from "../entities/payment.entity";

export interface IMercadoPagoClient {
    postOrder(payment: OrderPostInput): Promise<PaymentOutput>;
}
