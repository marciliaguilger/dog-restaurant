import { Module } from '@nestjs/common';
import { CustomerModule } from './application/customer/customer.module';
import { OrderModule } from './application/order/order.module';

@Module({
  imports: [CustomerModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
