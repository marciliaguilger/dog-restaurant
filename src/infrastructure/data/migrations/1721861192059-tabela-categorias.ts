import { MigrationInterface, QueryRunner } from "typeorm";

export class TabelaCategorias1721861192059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `USE DogRestaurant

            CREATE TABLE dbo.Categorias(
                CategoriaId varchar(40) NOT NULL,
                CategoriaDescricao varchar(20) NOT NULL,
                CONSTRAINT PK_Categoria PRIMARY KEY (CategoriaId)
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
