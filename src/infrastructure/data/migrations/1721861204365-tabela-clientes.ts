import { MigrationInterface, QueryRunner } from "typeorm";

export class TabelaClientes1721861204365 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `USE dogrestaurantdb

            CREATE TABLE dbo.Clientes(
                ClienteId varchar(40) NOT NULL,
                ClienteNome varchar(100) NOT NULL,
                ClienteDocumento varchar(50) NOT NULL,
                TipoDocumento varchar(10) NOT NULL,
                Email varchar(100) NOT NULL,
                CONSTRAINT PK_Customer PRIMARY KEY (ClienteId),
            )`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
