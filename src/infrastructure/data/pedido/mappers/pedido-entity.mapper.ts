import { Pedidos } from "../entities/pedido.entity";
import { Combo } from "src/domain/pedido/entities/combo.entity";
import { Pedidoscombos } from "../entities/pedido-combos.entity";
import { PedidoStatus } from "src/domain/pedido/enum/order-status.enum";
import { Pedido } from "src/domain/pedido/entities/pedido.entity";

export class OrderEntityMapper {

    static mapToOrderEntity(order: Pedido): Pedidos {
        let orders = new Pedidos()
        orders.PedidoId = order.pedidoId
        orders.ShortId = order.shortId
        orders.Criado = order.criado
        orders.Entregue = order.entregue
        orders.PreparacaoIniciada = order.preparacaoIniciada
        orders.PedidoStatus = order.status.toString()
        orders.ClienteId = order.clienteId
        orders.TotalValorCentavos = order.calculateOrderTotalAmount()
        orders.DescontoValorCentavos = order.descontoValor        
        return orders
    }

    static mapToOrderDomain(orderEntity: Pedidos, clienteName: string): Pedido {
        const orderStatus = PedidoStatus[orderEntity.PedidoStatus as keyof typeof PedidoStatus] || null;
        
        let order = Pedido.buildOrder(
            orderEntity.PedidoId,
            orderEntity.ShortId,
            orderEntity.Criado,
            orderEntity.PreparacaoIniciada,
            orderEntity.Cancelado,
            orderStatus,
            orderEntity.TotalValorCentavos,
            orderEntity.ClienteId,
            clienteName,
            orderEntity.PreparacaoIniciada,
            orderEntity.Entregue,
        )
        return order;
    }

    static mapToOrderComboDomain(orderCombos: Pedidoscombos[]): Combo[] {
        const comboMap = new Map<string, Combo>();

        for (const comboEntity of orderCombos) {
            let combo = comboMap.get(comboEntity.ComboId);
    
            if (!combo) {
                combo = new Combo(comboEntity.ComboId);
                combo.setOrderId(comboEntity.PedidoId);
                comboMap.set(comboEntity.ComboId, combo);
            }
    
            combo.addItem(comboEntity.CategoriaId, comboEntity.ProdutoId, comboEntity.PrecoCentavos);
        }
    
        return Array.from(comboMap.values());
    }

    static mapToOrderComboEntity(combo: Combo[]): Pedidoscombos[] {
        let combos: Pedidoscombos[] = []
        combo.forEach(c => {
            let mappedCombo = this.mapToCombo(c)
            mappedCombo.forEach(c => {
                combos.push(c)
            }) 
        });

        return combos
    }
    
    private static mapToCombo(combo: Combo): Pedidoscombos[] {
        let orderCombo: Pedidoscombos[] = []
        if(combo.lanche?.produtoId !== undefined) {
            let product = new Pedidoscombos()
            product.ComboId = combo.comboId
            product.PedidoId = combo.orderId
            product.ProdutoId = combo.lanche.produtoId
            product.CategoriaId = combo.lanche.categoriaId
            product.PrecoCentavos = combo.lanche.preco
            orderCombo.push(product)
        }

        if(combo.sobremesa?.produtoId !== undefined) {
            let product = new Pedidoscombos()
            product.ComboId = combo.comboId
            product.PedidoId = combo.orderId
            product.ProdutoId = combo.sobremesa.produtoId
            product.CategoriaId = combo.sobremesa.categoriaId
            product.PrecoCentavos = combo.sobremesa.preco
            orderCombo.push(product)
        }

        if(combo.acompanhamento?.produtoId !== undefined){
            let product = new Pedidoscombos()
            product.ComboId = combo.comboId
            product.PedidoId = combo.orderId
            product.ProdutoId = combo.acompanhamento.produtoId
            product.CategoriaId = combo.acompanhamento.categoriaId
            product.PrecoCentavos = combo.acompanhamento.preco
            orderCombo.push(product)
        }

        if(combo.bebida?.produtoId !== undefined){
            let product = new Pedidoscombos()
            product.ComboId = combo.comboId
            product.PedidoId = combo.orderId
            product.ProdutoId = combo.bebida.produtoId
            product.CategoriaId = combo.bebida.categoriaId
            product.PrecoCentavos = combo.bebida.preco
            orderCombo.push(product)
        }

        return orderCombo
    }
}