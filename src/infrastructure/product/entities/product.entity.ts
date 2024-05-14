import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Products {
    @PrimaryColumn()
    ProductId: string
    @Column()
    ProductName: string
    @Column()
    ProductDescription: string
    @Column()
    Price: number
    @Column()
    CategoryId: string
}