import { Categoria } from "src/domain/produto/entities/Categoria";
import { Produto } from "src/domain/produto/entities/Produto";
import { IProdutoGateway } from "src/domain/produto/ports/product-gateway.interface";

export class PedidoGateway implements IProdutoGateway {
    create(produto: Produto) {
        throw new Error("Method not implemented.");
    }
    createCategoria(categoria: Categoria) {
        throw new Error("Method not implemented.");
    }
    update(id: string, produto: Produto) {
        throw new Error("Method not implemented.");
    }
    updateStatus(id: string, ativo: boolean) {
        throw new Error("Method not implemented.");
    }
    getByNome(nome: string): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<Produto> {
        throw new Error("Method not implemented.");
    }
    getByCategoria(categoria: string): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }
    getAllCategorias(): Promise<Categoria[]> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Produto[]> {
        throw new Error("Method not implemented.");
    }

}