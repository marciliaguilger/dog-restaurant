<<<<<<<< HEAD:src/infrastructure/data/customer/repositories/customer.provider.ts
import { Customers } from "../entities/customer.entity";
========
>>>>>>>> main:src/infrastructure/database/customer/customer.provider.ts
import { DataSource } from "typeorm";
import { Customers } from "../entities/customer.entity";

export const customerProviders = [
    {
        provide: 'CUSTOMER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Customers),
        inject: ['DATA_SOURCE']
    }
]