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

    async updateStatus(id: string, active: boolean): Promise<string> {
        this.productRepository.updateStatus(id, active);
        return id;
    }

    async getAllCategorias(): Promise<Categoria[]> {
        const categories = await this.productRepository.getAllCategorias();    
        return categories;
    }

    async update(id: string, product: Produto): Promise<string> {
        this.productRepository.update(id, product);
        return id;
    }
              
    async create(product: Produto): Promise<string> {
        product.id = randomUUID()

        this.productRepository.create(product);
        return product.id;
    }

    async createCategoria(category: Categoria): Promise<string> {
        category.id = randomUUID();

        this.productRepository.createCategoria(category);
        return category.id;
    }

    async getByNome(name: string): Promise<Produto> {
        return this.productRepository.getByNome(name)
    }

    async getById(id: string): Promise<Produto> {
        return this.productRepository.getById(id)
    }

    async getByCategoria(category: string): Promise<Produto[]> {
        return this.productRepository.getByCategoria(category)

    }

    async getAll(): Promise<Produto[]> {
        const products = await this.productRepository.getAll()    
        return products;    
    }
}