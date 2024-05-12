import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Customers {
    @PrimaryColumn()
    CustomerId: string
    @Column()
    CustomerName: string
    @Column()
    CustomerDocument: string
    @Column()
    DocumentType: string
    @Column()
    Email: string
}