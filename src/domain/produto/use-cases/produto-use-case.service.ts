import { Inject, Injectable } from "@nestjs/common";
import { IProdutoUseCase } from "./produto-use-case.interface";
import { Produto } from "../entities/Produto";
import { randomUUID } from "crypto";
import { Categoria } from "../entities/Categoria";
import { IProdutoGateway } from "../ports/product-gateway.interface";

@Injectable()
export class ProdutoUseCase implements IProdutoUseCase {
    constructor(
        @Inject(IProdutoGateway) 
        private readonly produtoGateway: IProdutoGateway
    ) {}

    async updateStatus(id: string, ativo: boolean): Promise<string> {
        this.produtoGateway.updateStatus(id, ativo);
        return id;
    }

    async getAllCategorias(): Promise<Categoria[]> {
        const categories = await this.produtoGateway.getAllCategorias();    
        return categories;
    }

    async update(id: string, produto: Produto): Promise<string> {
        this.produtoGateway.update(id, produto);
        return id;
    }
              
    async create(produto: Produto): Promise<string> {
        produto.id = randomUUID()

        this.produtoGateway.create(produto);
        return produto.id;
    }

    async createCategoria(categoria: Categoria): Promise<string> {
        categoria.id = randomUUID();

        this.produtoGateway.createCategoria(categoria);
        return categoria.id;
    }

    async getByNome(nome: string): Promise<Produto> {
        return this.produtoGateway.getByNome(nome)
    }

    async getById(id: string): Promise<Produto> {
        return this.produtoGateway.getById(id)
    }

    async getByCategoria(categoria: string): Promise<Produto[]> {
        return this.produtoGateway.getByCategoria(categoria)

    }

    async getAll(): Promise<Produto[]> {
        const produtos = await this.produtoGateway.getAll()    
        return produtos;    
    }
}