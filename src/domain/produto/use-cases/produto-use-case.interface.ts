import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";

export interface IProdutoUseCase{
    create(produto: Produto): Promise<string>;
    createCategoria(Categoria: Categoria): Promise<string>;
    update(id: string, produto: Produto): Promise<string>;
    updateStatus(id: string, ativo: boolean): Promise<string>;
    getByNome(nome: string): Promise<Produto>;
    getById(id: string): Promise<Produto>;
    getByCategoria(Categoria: string): Promise<Produto[]>;
    getAll(): Promise<Produto[]>;
    getAllCategorias(): Promise<Categoria[]>;
}

export const IProdutoUseCase = Symbol('IProdutoUseCase');
