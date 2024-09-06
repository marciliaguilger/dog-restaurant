import { Module } from '@nestjs/common';
import { ProdutoModule } from './frameworks-drivers/api/produto/produto.module';
import { ClienteModule } from './frameworks-drivers/api/cliente/cliente.module';
import { PedidoModule } from './frameworks-drivers/api/pedido/pedido.module';

@Module({
  imports: [
    ProdutoModule, 
    ClienteModule, 
    PedidoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
