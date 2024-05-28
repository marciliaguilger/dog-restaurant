import { Module } from '@nestjs/common';
import { ProdutoModule } from './application/produto/produto.module';
import { ClienteModule } from './application/cliente/cliente.module';
import { PedidoModule } from './application/pedido/pedido.module';

@Module({
  imports: [
    ProdutoModule, 
    ClienteModule, 
    PedidoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
