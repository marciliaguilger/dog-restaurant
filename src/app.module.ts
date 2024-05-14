import { Module } from '@nestjs/common';
import { CustomerModule } from './application/customer/customer.module';
import { ProductModule } from './application/product/product.module';

@Module({
  imports: [CustomerModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
