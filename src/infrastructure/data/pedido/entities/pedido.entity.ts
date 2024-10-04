import { Column, Entity,  PrimaryColumn } from "typeorm";

@Entity('Pedidos')
export class Pedidos {
    @PrimaryColumn()
    PedidoId: string
    @Column()
    ShortId: string
    @Column()
    Criado: Date
    @Column()
    Entregue: Date
    @Column()
    PreparacaoIniciada: Date
    @Column()
    PreparacaoConcluida: Date
    @Column()
    Cancelado: Date
    @Column()
    PedidoStatus : string
    @Column()
    ClienteId: string
    @Column()
    TotalValorCentavos: number
    @Column()
    DescontoValorCentavos: number
}

