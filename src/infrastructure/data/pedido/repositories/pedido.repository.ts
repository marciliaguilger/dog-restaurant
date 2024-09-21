import { Inject, Injectable } from "@nestjs/common";
import { IPedidoRepository } from "src/domain/pedido/repositories/order-repository.interface";
import { PedidoStatus } from "src/domain/pedido/enum/order-status.enum";
import { Pedido } from "src/domain/pedido/entities/pedido.entity";

@Injectable()
export class PedidoRepository implements IPedidoRepository {
    constructor(
        
    ) {}

    async getAllPedidos():Promise<Pedido[]>{
        return null
    }

    async getPedidoById(pedidoId: string): Promise<Pedido> {
        return null
    }
    
    async getPedidosByStatus(status: PedidoStatus): Promise<Pedido[]> {
        return null
    }
            
    updatePedido(order: Pedido) {
        return null
    }
    
    async createPedido(order: Pedido) {
        return null
    }
}