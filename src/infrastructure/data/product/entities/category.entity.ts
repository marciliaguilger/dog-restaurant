import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Categories {
    @PrimaryColumn()
    CategoryId: string
    @Column()
    CategoryDescription: string
}