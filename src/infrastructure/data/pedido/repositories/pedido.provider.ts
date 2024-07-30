import { DataSource } from "typeorm";
import { Pedidos } from "../entities/pedido.entity";
import { Pedidoscombos } from "../entities/pedido-combos.entity";
import { Clientes } from "../../cliente/entities/customer.entity";

export const pedidoProviders =[
    {
        provide: 'PEDIDO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Pedidos),
        inject: ['DATA_SOURCE']
    },
    {
        provide: 'COMBOS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Pedidoscombos),
        inject: ['DATA_SOURCE']
    },
    {
        provide: 'CLIENTE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Clientes),
        inject: ['DATA_SOURCE']
    }
]