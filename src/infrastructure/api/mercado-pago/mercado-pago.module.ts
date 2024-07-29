import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MercadoPagoClient } from './clients/mercado-pago.client';
import { randomUUID } from 'crypto';


@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        timeout: configService.get('TIMEOUT'),
        maxRedirects: configService.get('MAX_REDIRECTS'),
        baseURL: configService.get('MERCADO_PAGO_URL'),
        headers: {
          'X-Idempotency-Key': randomUUID(),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'IMercadoPagoClient',
      useClass: MercadoPagoClient,
    },
  ],
  exports: ['IMercadoPagoClient'],
})
export class MercadoPagoModule {}
