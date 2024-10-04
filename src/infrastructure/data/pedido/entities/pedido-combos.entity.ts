import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity('PedidosCombos')
export class Pedidoscombos {
    @PrimaryColumn()
    PedidoId: string
    @PrimaryColumn()
    ComboId: string
    @PrimaryColumn()
    ProdutoId: string
    @Column()
    CategoriaId: string
    @Column()
    PrecoCentavos: number
}

