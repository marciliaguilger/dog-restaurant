import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Categorias {
    @PrimaryColumn()
    CategoriaId: string
    @Column()
    CategoriaDescricao: string
}