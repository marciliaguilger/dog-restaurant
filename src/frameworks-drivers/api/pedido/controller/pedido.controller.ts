import { Body, Controller, Get, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { CreatePedidoInput } from "../../../../interface-adapters/presenters/pedido/create-pedido.input";
import { OrderMapper } from "../../../../interface-adapters/presenters/pedido.mapper";
import { CheckoutPedidoInput } from "../../../../interface-adapters/presenters/pedido/checkout-pedido.input";
import { ApiTags } from "@nestjs/swagger";
import { PedidoStatus } from "src/domain/pedido/enum/order-status.enum";
import { UpdatePedidoInput } from "../../../../interface-adapters/presenters/pedido/update-pedido.input";
import { PedidoInterfaceController } from "src/interface-adapters/controllers/pedido-interface.controller";

@ApiTags('Pedidos')
@Controller('pedidos')
export class OrderController {
    constructor(
        private readonly pedidoInterfaceController: PedidoInterfaceController,
    ) {}

    @Post()
    async createPedido(@Body() createPedidosInput: CreatePedidoInput){
        console.log('Criando novo pedido')
        return { pedidoId: await this.pedidoInterfaceController.createPedido(createPedidosInput) }
    }

    @Put(':pedidoId/status')
    async updatePedidoStatus(@Param('pedidoId') pedidoId: string, @Body() updatePedidos: UpdatePedidoInput) {
        if (!updatePedidos.status) {
            throw new Error('Invalid order status');
        }
        await this.pedidoInterfaceController.updatePedidoStatus(pedidoId, updatePedidos);
        return { message: 'Pedidos status updated successfully' };
    }

    @Put(':pedidoId/checkout')
    async checkoutPedido(@Param('pedidoId') pedidoId: string) {
        const qrCode = await this.pedidoInterfaceController.checkoutPedido(pedidoId)
        return { qrCode: qrCode };
    }

    @Get()
    async getAllPedidos() {
        return await this.pedidoInterfaceController.getAllPedidos();
    }

    @Get(':pedidoId')
    async getPedidoById(@Param('pedidoId') pedidoId: string) {
        return await this.pedidoInterfaceController.getPedidoById(pedidoId);
    }

    @Get('status/:status')
    async getPedidosByStatus(@Param('status') status: PedidoStatus) {
        return await this.pedidoInterfaceController.getPedidosByStatus(status);
    }
}