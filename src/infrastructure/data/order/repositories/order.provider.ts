import { DataSource } from "typeorm";
import { Orders } from "../entities/order.entity";
import { Ordercombos } from "../entities/order-combos.entity";

export const orderProviders =[
    {
        provide: 'ORDER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Orders),
        inject: ['DATA_SOURCE']
    },
    {
        provide: 'COMBOS_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Ordercombos),
        inject: ['DATA_SOURCE']
    }
]