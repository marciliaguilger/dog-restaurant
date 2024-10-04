import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('Categorias')
export class Categorias {
    @PrimaryColumn()
    CategoriaId: string
    @Column()
    CategoriaDescricao: string
}