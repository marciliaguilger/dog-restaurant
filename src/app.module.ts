import { Module } from '@nestjs/common';
import { CustomerModule } from './application/customer/customer.module';
import { ProductModule } from './application/product/product.module';
import { OrderModule } from './application/order/order.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.development',
    }),
    CustomerModule, 
    ProductModule, 
    OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
