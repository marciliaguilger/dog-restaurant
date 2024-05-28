import { Module } from '@nestjs/common';
import { CustomerModule } from './application/customer/customer.module';
import { ProdutoModule } from './application/produto/produto.module';
import { OrderModule } from './application/order/order.module';

@Module({
  imports: [
    CustomerModule, 
    ProdutoModule, 
    OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
