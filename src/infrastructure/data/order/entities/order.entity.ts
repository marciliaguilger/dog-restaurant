import { Column, Entity, PrimaryColumn } from "typeorm";

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
    OrderStatus : string
    @Column()
    CustomerId: string
    @Column()
    CustomerName: string
    @Column()
    TotalAmountInCents: number
    @Column()
    DiscountAmountInCents: number
}

