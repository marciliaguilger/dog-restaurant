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
        private readonly productRepository: IProdutoRepository
    ) {}

    async updateStatus(id: string, ativo: boolean): Promise<string> {
        this.productRepository.updateStatus(id, ativo);
        return id;
    }

    async getAllCategorias(): Promise<Categoria[]> {
        const categories = await this.productRepository.getAllCategorias();    
        return categories;
    }

    async update(id: string, produto: Produto): Promise<string> {
        this.productRepository.update(id, produto);
        return id;
    }
              
    async create(produto: Produto): Promise<string> {
        produto.id = randomUUID()

        this.productRepository.create(produto);
        return produto.id;
    }

    async createCategoria(categoria: Categoria): Promise<string> {
        categoria.id = randomUUID();

        this.productRepository.createCategoria(categoria);
        return categoria.id;
    }

    async getByNome(nome: string): Promise<Produto> {
        return this.productRepository.getByNome(nome)
    }

    async getById(id: string): Promise<Produto> {
        return this.productRepository.getById(id)
    }

    async getByCategoria(categoria: string): Promise<Produto[]> {
        return this.productRepository.getByCategoria(categoria)

    }

    async getAll(): Promise<Produto[]> {
        const produtos = await this.productRepository.getAll()    
        return produtos;    
    }
}