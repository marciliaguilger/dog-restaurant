import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export class OrderCombos {
    @PrimaryColumn()
    OrderId: string
    @PrimaryColumn()
    ComboId: string
    @Column()
    ProductId: string
    PriceInCents: number

}