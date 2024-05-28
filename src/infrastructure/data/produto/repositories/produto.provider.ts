import { DataSource } from "typeorm";
import { Produtos } from "../entities/produto.entity";

export const produtoProviders = [
    {
        provide: 'PRODUTO_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Produtos),
        inject: ['DATA_SOURCE']
    }
]