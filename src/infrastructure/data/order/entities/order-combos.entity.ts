import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm"

@Entity()
export class Ordercombos {
    @PrimaryColumn()
    OrderId: string
    @PrimaryColumn()
    ComboId: string
    @PrimaryColumn()
    ProductId: string
    @Column()
    CategoryId: string
    @Column()
    PriceInCents: number
}

