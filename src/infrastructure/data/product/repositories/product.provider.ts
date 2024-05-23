import { DataSource } from "typeorm";
import { Products } from "../entities/product.entity";

export const productProviders = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Products),
        inject: ['DATA_SOURCE']
    }
]