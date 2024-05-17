import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Orders {
    @PrimaryColumn()
    OrderId: string
    @Column()
    ShortId: string
    CreatedAt: Date
    DeliveredAt: Date
    StartedPreparationAt: Date
    OrderStatus : string
    CustomerId: string
    CustomerName: string
    TotalAmountInCents: number
    DiscountAmountInCents: number
}

