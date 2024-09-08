import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, of } from 'rxjs';
import { OrderPostInput } from './inputs/order.input';
import { IMercadoPagoClient } from '../../../../domain/mercado-pago/clients/mercado-pago-client.interface';
import { PaymentOutput } from './outputs/payment.output';

@Injectable()
export class MercadoPagoClient implements IMercadoPagoClient{
  constructor(private readonly httpService: HttpService) {}
  async postOrder(paymentInput: OrderPostInput): Promise<PaymentOutput> {
    const url = '/instore/orders/qr/seller/collectors/358424382/pos/SUC001POS001/qrs';

    const response = await firstValueFrom(
      this.httpService.post<PaymentOutput>(url, paymentInput).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(error.response.data, error.response.status);
        })
      )
    );

    return response?.data;
  }
}
