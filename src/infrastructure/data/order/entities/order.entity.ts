import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Ordercombos } from "./order-combos.entity";

@Entity()
export class Orders {
    @PrimaryColumn()
    OrderId: string
    @Column()
    ShortId: string
    @Column()
    CreatedAt: Date
    @Column()
    DeliveredAt: Date
    @Column()
    StartedPreparationAt: Date
    @Column()
    PreparationConcludedAt: Date
    @Column()
    CancelledAt: Date
    @Column()
    OrderStatus : string
    @Column()
    CustomerId: string
    @Column()
    TotalAmountInCents: number
    @Column()
    DiscountAmountInCents: number
}

