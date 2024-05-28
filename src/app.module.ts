import { Module } from '@nestjs/common';
import { ProdutoModule } from './application/produto/produto.module';
import { ClienteModule } from './application/cliente/cliente.module';
import { OrderModule } from './application/order/order.module';

@Module({
  imports: [
    ProdutoModule, 
    ClienteModule, 
    OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
