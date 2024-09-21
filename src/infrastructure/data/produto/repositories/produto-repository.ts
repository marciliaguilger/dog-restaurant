import { Inject, Injectable } from "@nestjs/common";
import { QueryFailedError, Repository } from "typeorm";

import { IProdutoRepository } from "src/domain/produto/repositories/product-repository.interface";
import { Categoria } from "src/domain/produto/entities/Categoria";
import { Produto } from "src/domain/produto/entities/Produto";
import { Categorias } from "../entities/categoria.entity";
import { Produtos } from "../entities/produto.entity";

@Injectable()
export class ProductRepository implements IProdutoRepository {
    constructor(
      ) {}
    createCategoria(categoria: Categoria) {
        throw new Error("Method not implemented.");
    }

    async updateStatus(id: string, ativo: boolean) {
        return null
    }

    create(produto: Produto) {
       
    }

    async update(id: string, produto: Produto): Promise<string> {
       return null
    }    
    async getAllCategorias(): Promise<Categoria[]> {
        return null
    }

    async getAll(): Promise<Produto[]> {
        return null
    }

    async getByNome(nome: string): Promise<Produto | undefined> {
        return null
    }

    async getById(id: string): Promise<Produto | undefined> {
        return null 
    }

    async getByCategoria(categoria: string): Promise<Produto[] | undefined> {
        return null
    }
}