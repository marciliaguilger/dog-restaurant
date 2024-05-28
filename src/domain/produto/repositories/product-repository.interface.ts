import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";

export interface IProdutoRepository{
    create(product: Produto);
    createCategoria(categoria: Categoria);
    update(id:string, product: Produto);
    updateStatus(id:string, active: boolean);
    getByNome(name: string): Promise<Produto>;
    getById(id: string): Promise<Produto>;
    getByCategoria(categoria: string): Promise<Produto[]>;
    getAllCategorias():  Promise<Categoria[]>;
    getAll(): Promise<Produto[]>;
}
export const IProdutoRepository = Symbol('IProdutoRepository');