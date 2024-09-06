import { Clientes } from "../entities/customer.entity";
import { DataSource } from "typeorm";

export const customerProviders = [
    {
        provide: 'CLIENTE_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Clientes),
        inject: ['DATA_SOURCE']
    }
]