import { MigrationInterface, QueryRunner } from "typeorm";

export class TabelaProdutos1721861198963 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `USE DogRestaurant

            CREATE TABLE dbo.Produtos(
                ProdutoId varchar(40) NOT NULL,
                ProdutoNome varchar(100) NOT NULL,
                ProdutoDescricao varchar(255) NOT NULL,
                Preco money NOT NULL,
                CategoriaId varchar(40) NOT NULL,
                Ativo bit NOT NULL default(1),
                CONSTRAINT PK_Produto PRIMARY KEY (ProdutoId),
                CONSTRAINT FK_Produto_Categoria FOREIGN KEY (CategoriaId) REFERENCES dbo.Categorias(CategoriaId)
            )`,
        )
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
