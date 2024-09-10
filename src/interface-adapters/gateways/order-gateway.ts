import { Inject } from "@nestjs/common";
import { Pedido } from "src/domain/pedido/entities/pedido.entity";
import { PedidoStatus } from "src/domain/pedido/enum/order-status.enum";
import { IPedidoGateway } from "src/domain/pedido/ports/order-gateway.interface";
import { IPedidoRepository } from "src/domain/pedido/ports/order-repository.interface";

export class PedidoGateway implements IPedidoGateway {
    constructor(
        @Inject(IPedidoRepository)
        private readonly pedidoRepository: IPedidoRepository
    )
    {}
    createPedido(order: Pedido) {
        this.pedidoRepository.createPedido(order)
    }
    getAllPedidos(): Promise<Pedido[]> {
        return this.pedidoRepository.getAllPedidos()
    }
    getPedidoById(orderId: string): Promise<Pedido> {
        return this.pedidoRepository.getPedidoById(orderId)
    }
    getPedidosByStatus(status: PedidoStatus): Promise<Pedido[]> {
        return this.pedidoRepository.getPedidosByStatus(status)
    }
    updatePedido(order: Pedido) {
        this.pedidoRepository.updatePedido(order)
    }

    

}