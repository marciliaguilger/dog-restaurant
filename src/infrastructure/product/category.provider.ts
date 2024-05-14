import { DataSource } from "typeorm";
import { Categories } from "./entities/category.entity";

export const categoryProviders = [
    {
        provide: 'CATEGORY_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Categories),
        inject: ['DATA_SOURCE']
    }
]