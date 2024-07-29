import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, of } from 'rxjs';
import { PaymentInput } from './inputs/pagamento.input';
import { IMercadoPagoClient } from '../../../../domain/mercado-pago/clients/mercado-pago-client.interface';
import { Payment } from 'src/domain/mercado-pago/entities/payment.entity';

@Injectable()
export class MercadoPagoClient implements IMercadoPagoClient{
  constructor(private readonly httpService: HttpService) {}
  async postPayment(paymentInput: Payment): Promise<PaymentResponse> {
    const url = '/v1/payments';

    const response = await firstValueFrom(
      this.httpService.post<PaymentInput>(url, paymentInput).pipe(
        catchError((error: AxiosError) => {
          throw new HttpException(error.response.data, error.response.status);
        })
      )
    );

    return response?.data;
  }
}
