import { DataSource } from "typeorm";
import { Categorias } from "../entities/categoria.entity";

export const categoriaProviders = [
    {
        provide: 'CATEGORIA_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Categorias),
        inject: ['DATA_SOURCE']
    }
]