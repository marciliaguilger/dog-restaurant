import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Clientes')
export class Clientes {
    @PrimaryColumn()
    ClienteId: string
    @Column()
    ClienteNome: string
    @Column()
    ClienteDocumento: string
    @Column()
    TipoDocumento: string
    @Column()
    Email: string
}