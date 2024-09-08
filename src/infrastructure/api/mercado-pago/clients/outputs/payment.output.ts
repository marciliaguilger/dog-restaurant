import { Expose } from "class-transformer";

export class PaymentOutput {

    @Expose({ name: 'qr_data' })
    qrData: string;
}