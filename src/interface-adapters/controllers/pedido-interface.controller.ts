import { Inject } from "@nestjs/common";
import { IPedidoUseCase } from "src/domain/pedido/use-cases/pedido-use-case.interface";
import { OrderMapper } from "../presenters/pedido.mapper";
import { CreatePedidoInput } from "../presenters/pedido/create-pedido.input";
import { UpdatePedidoInput } from "../presenters/pedido/update-pedido.input";
import { PedidoStatus } from "src/domain/pedido/enum/order-status.enum";

export class PedidoInterfaceController {
    constructor(
        @Inject(IPedidoUseCase)
        private readonly pedidoUseCase: IPedidoUseCase,
        private readonly orderMapper: OrderMapper
    ) {}

    async createPedido(createPedidosInput: CreatePedidoInput){
        console.log('Criando novo pedido')
        let combos = await this.orderMapper.mapToComboList(createPedidosInput.combos)
        
        return { pedidoId: await this.pedidoUseCase.createPedido(createPedidosInput.clienteId, combos) }
    }

    async updatePedidoStatus(pedidoId: string, updatePedidos: UpdatePedidoInput) {
        if (!updatePedidos.status) {
            throw new Error('Invalid order status');
        }
        await this.pedidoUseCase.updatePedidoStatus(pedidoId, updatePedidos.status);
        return { message: 'Pedidos status updated successfully' };
    }

    async checkoutPedido(pedidoId: string) {
        const qrCode = await this.pedidoUseCase.payPedido(pedidoId)
        return { qrCode: qrCode };
    }

    async getAllPedidos() {
        const pedidos = await this.pedidoUseCase.getAllPedidos();
        return pedidos.map(order => this.orderMapper.mapToOrderDto(order));
    }

    async getPedidoById(pedidoId: string) {
        const order = await this.pedidoUseCase.getPedidoById(pedidoId);
        return this.orderMapper.mapToOrderDto(order);
    }

    async getPedidosByStatus(status: PedidoStatus) {
        const pedidos = await this.pedidoUseCase.getPedidosByStatus(status);
        return pedidos.map(order => this.orderMapper.mapToOrderDto(order));
    }
}