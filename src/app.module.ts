import { Module } from '@nestjs/common';
import { ClienteModule } from './application/cliente/cliente.module';
import { ProductModule } from './application/product/product.module';
import { OrderModule } from './application/order/order.module';

@Module({
  imports: [
    ClienteModule, 
    ProductModule, 
    OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
