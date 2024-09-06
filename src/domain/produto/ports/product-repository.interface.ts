import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";

export interface IProdutoRepository{
    create(produto: Produto);
    createCategoria(categoria: Categoria);
    update(id:string, produto: Produto);
    updateStatus(id:string, ativo: boolean);
    getByNome(nome: string): Promise<Produto>;
    getById(id: string): Promise<Produto>;
    getByCategoria(categoria: string): Promise<Produto[]>;
    getAllCategorias():  Promise<Categoria[]>;
    getAll(): Promise<Produto[]>;
}
export const IProdutoRepository = Symbol('IProdutoRepository');