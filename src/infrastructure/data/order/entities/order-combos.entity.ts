import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class Ordercombos {
    @PrimaryColumn()
    OrderId: string
    @PrimaryColumn()
    ComboId: string
    @Column()
    ProductId: string
    @Column()
    PriceInCents: number
}

