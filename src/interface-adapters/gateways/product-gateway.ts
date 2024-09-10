import { Inject } from "@nestjs/common";
import { IPedidoUseCase } from "src/domain/pedido/use-cases/pedido-use-case.interface";
import { Categoria } from "src/domain/produto/entities/Categoria";
import { Produto } from "src/domain/produto/entities/Produto";
import { IProdutoGateway } from "src/domain/produto/ports/product-gateway.interface";
import { IProdutoRepository } from "src/domain/produto/ports/product-repository.interface";

export class ProdutoGateway implements IProdutoGateway {

    constructor(
        @Inject(IProdutoRepository)
        private readonly produtoRepository: IProdutoRepository
    ){ }
    create(produto: Produto) {
        this.produtoRepository.create(produto);
    }
    createCategoria(categoria: Categoria) {
        this.produtoRepository.createCategoria(categoria);
    }
    update(id: string, produto: Produto) {
        this.produtoRepository.update(id, produto);
    }
    updateStatus(id: string, ativo: boolean) {
        this.produtoRepository.updateStatus(id, ativo)
    }
    getByNome(nome: string): Promise<Produto> {
        return this.produtoRepository.getByNome(nome)
    }
    getById(id: string): Promise<Produto> {
        return this.produtoRepository.getById(id)
    }
    getByCategoria(categoria: string): Promise<Produto[]> {
        return this.getByCategoria(categoria)
    }
    getAllCategorias(): Promise<Categoria[]> {
        return this.getAllCategorias()
    }
    getAll(): Promise<Produto[]> {
        return this.produtoRepository.getAll()
    }
}