import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Produtos {
    @PrimaryColumn()
    ProdutoId: string
    @Column()
    ProdutoNome: string
    @Column()
    ProdutoDescricao: string
    @Column()
    Preco: number
    @Column()
    CategoriaId: string
    @Column()
    Ativo: boolean    
}