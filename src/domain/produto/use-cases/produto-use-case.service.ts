import { Inject, Injectable } from "@nestjs/common";
import { IProdutoUseCase } from "./produto-use-case.interface";
import { Produto } from "../entities/Produto";
import { randomUUID } from "crypto";
import { IProdutoRepository } from "../repositories/product-repository.interface";
import { Categoria } from "../entities/Categoria";

@Injectable()
export class ProdutoUseCase implements IProdutoUseCase {
    constructor(
        @Inject(IProdutoRepository) 
        private readonly produtoRepository: IProdutoRepository
    ) {}

    async updateStatus(id: string, ativo: boolean): Promise<string> {
        this.produtoRepository.updateStatus(id, ativo);
        return id;
    }

    async getAllCategorias(): Promise<Categoria[]> {
        const categories = await this.produtoRepository.getAllCategorias();    
        return categories;
    }

    async update(id: string, produto: Produto): Promise<string> {
        this.produtoRepository.update(id, produto);
        return id;
    }
              
    async create(produto: Produto): Promise<string> {
        produto.id = randomUUID()

        this.produtoRepository.create(produto);
        return produto.id;
    }

    async createCategoria(categoria: Categoria): Promise<string> {
        categoria.id = randomUUID();

        this.produtoRepository.createCategoria(categoria);
        return categoria.id;
    }

    async getByNome(nome: string): Promise<Produto> {
        return this.produtoRepository.getByNome(nome)
    }

    async getById(id: string): Promise<Produto> {
        return this.produtoRepository.getById(id)
    }

    async getByCategoria(categoria: string): Promise<Produto[]> {
        return this.produtoRepository.getByCategoria(categoria)

    }

    async getAll(): Promise<Produto[]> {
        const produtos = await this.produtoRepository.getAll()    
        return produtos;    
    }
}