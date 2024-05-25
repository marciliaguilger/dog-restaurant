import { Module } from '@nestjs/common';
import { CustomerModule } from './application/customer/customer.module';
import { ProductModule } from './application/product/product.module';
import { OrderModule } from './application/order/order.module';

@Module({
  imports: [
    CustomerModule, 
    ProductModule, 
    OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
