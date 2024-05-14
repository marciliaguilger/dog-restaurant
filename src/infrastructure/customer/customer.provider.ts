import { Customers } from "./entities/customer.entity";
import { DataSource } from "typeorm";

export const customerProviders = [
    {
        provide: 'CUSTOMER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Customers),
        inject: ['DATA_SOURCE']
    }
]