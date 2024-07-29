import { MigrationInterface, QueryRunner } from "typeorm";

export class TabelaPedidosCombos1721861221424 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `USE DogRestaurant

            CREATE TABLE dbo.PedidosCombos(
                PedidoId varchar(40) NOT NULL,
                ComboId varchar(40) NOT NULL,
                ProdutoId varchar(40) NOT NULL,
                CategoriaId varchar(40) NOT NULL,
                PrecoCentavos MONEY NOT NULL,
                CONSTRAINT PK_PedidoCombo PRIMARY KEY (PedidoId, ComboId, ProdutoId),
                CONSTRAINT FK_Pedido_PedidoCombo FOREIGN KEY (PedidoId) REFERENCES dbo.Pedidos(PedidoId),
                CONSTRAINT FK_Pedido_Produto FOREIGN KEY (ProdutoId) REFERENCES dbo.Produtos(ProdutoId)
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
