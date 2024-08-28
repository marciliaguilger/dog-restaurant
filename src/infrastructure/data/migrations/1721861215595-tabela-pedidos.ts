import { MigrationInterface, QueryRunner } from "typeorm";

export class TabelaPedidos1721861215595 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `USE DogRestaurant

            CREATE TABLE dbo.Pedidos(
                PedidoId varchar(40) NOT NULL,
                ShortId varchar(10) NOT NULL,
                Criado DATETIME NOT NULL,
                PreparacaoIniciada DATETIME NULL,
                PreparacaoConcluida DATETIME NULL,
                Entregue DATETIME NULL,
                Cancelado DATETIME NULL,
                PedidoStatus VARCHAR(25) NOT NULL,
                ClienteId VARCHAR(40) NULL,
                TotalValorCentavos MONEY NOT NULL,
                DescontoValorCentavos MONEY NULL,
                CONSTRAINT PK_Pedido PRIMARY KEY (PedidoId),
                CONSTRAINT FK_Pedido_Customer FOREIGN KEY (ClienteId) REFERENCES dbo.Clientes(ClienteId)
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
