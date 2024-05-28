import { Inject, Injectable } from "@nestjs/common";
import { Produto } from "src/domain/produto/entities/Produto";
import { IProdutoRepository } from "src/domain/produto/repositories/product-repository.interface";
import { Repository } from "typeorm";
import { Categoria } from "src/domain/produto/entities/Categoria";
import { Categorias } from "../entities/categoria.entity";
import { Produtos } from "../entities/produto.entity";

@Injectable()
export class ProductRepository implements IProdutoRepository {
    constructor(
        @Inject('PRODUTO_REPOSITORY')
        private productRepo: Repository<Produtos>,
        @Inject('CATEGORIA_REPOSITORY')
        private categoriaRepo: Repository<Categorias>,
      ) {}

    async updateStatus(id: string, ativo: boolean) {
        const produtoEntity = await this.productRepo
            .createQueryBuilder("Produtos")
            .where("Produtos.ProdutoId = :id", { id: id })
            .getOne();
    
        if (!produtoEntity) return undefined;
    
        produtoEntity.Ativo = ativo;
    
        await this.productRepo.save(produtoEntity);
    
        return id;    
    }

    async create(product: Produto) {
        const productEntity = new Produtos();
        productEntity.ProdutoId = product.id;
        productEntity.ProdutoNome = product.nome;
        productEntity.ProdutoDescricao = product.descricao;
        productEntity.Preco = product.preco;
        productEntity.CategoriaId = product.categoria; 
        productEntity.Ativo = product.ativo; 
    
        await this.productRepo.save(productEntity);
    }

    async createCategoria(categoria: Categoria) {
        const categoriaEntity = new Categorias();

        categoriaEntity.CategoriaId = categoria.id;
        categoriaEntity.CategoriaDescricao = categoria.nome;

        await this.categoriaRepo.save(categoriaEntity);
    }

    async update(id: string, produto: Produto): Promise<string> {
        const produtoEntity = await this.productRepo
            .createQueryBuilder("Produtos")
            .where("Products.ProdutoId = :id", { id: id })
            .getOne();
    
        if (!produtoEntity) return undefined;
    
        produtoEntity.ProdutoNome = produto.nome;
        produtoEntity.ProdutoDescricao = produto.descricao;
        produtoEntity.Preco = produto.preco;
    
        await this.productRepo.save(produtoEntity);
    
        return id;
    }    
    async getAllCategorias(): Promise<Categoria[]> {
        const categoriesEntities = await this.categoriaRepo
            .createQueryBuilder("Categorias")
            .getMany();

        const categories: Categoria[] = categoriesEntities.map(entity => {
            try {
                return new Categoria(entity.CategoriaDescricao, entity.CategoriaId);
            } catch (error) {
                console.error(`Erro ao criar categoria: ${error.message}`);

            }
        }).filter(categoria => categoria !== undefined);
    
        return categories;
    }

    async getAll(): Promise<Produto[]> {
        const produtosEntities = await this.productRepo
            .createQueryBuilder("Produtos")
            .getMany();

        const produtos: Produto[] = produtosEntities.map(entity => {
            try {
                return new Produto(entity.ProdutoNome, entity.CategoriaId, entity.Preco, entity.ProdutoDescricao, entity.Ativo, entity.ProdutoId);
            } catch (error) {
                console.error(`Erro ao criar produto: ${error.message}`);

            }
        }).filter(products => products !== undefined);
    
        return produtos;
    }

    async getByNome(nome: string): Promise<Produto | undefined> {
        const produtoEntity = await this.productRepo
            .createQueryBuilder("Produtos")
            .where("Produtos.ProdutoNome = :nome", { nome: nome })
            .getOne();
    
        if (!produtoEntity) return undefined;
        
        const product = new Produto(
            produtoEntity.ProdutoNome,
            produtoEntity.CategoriaId,
            produtoEntity.Preco,
            produtoEntity.ProdutoDescricao,
            produtoEntity.Ativo,        
            produtoEntity.ProdutoId, 
        );
    
        return product;
    }

    async getById(id: string): Promise<Produto | undefined> {
        const produtoEntity = await this.productRepo
            .createQueryBuilder("Produtos")
            .where("Products.ProdutoId = :id", { id: id })
            .getOne();
    
        if (!produtoEntity) return undefined;
    
        const product = new Produto(
            produtoEntity.ProdutoNome,
            produtoEntity.CategoriaId,
            produtoEntity.Preco,
            produtoEntity.ProdutoDescricao,
            produtoEntity.Ativo,        
            produtoEntity.ProdutoId,    
        );
        
        return product;    
    }

    async getByCategoria(categoria: string): Promise<Produto[] | undefined> {
        const categoriaEntity = await this.categoriaRepo
            .createQueryBuilder("Categorias")
            .where("Categorias.CategoriaDescricao = :categoria", { categoria: categoria })
            .getOne();
    
        if (!categoriaEntity) return undefined;
    
        const productEntities = await this.productRepo
            .createQueryBuilder("Produtos")
            .where("Products.CategoriaId = :categoriaId", { categoriaId: categoriaEntity.CategoriaId })
            .getMany();
    
        const products = productEntities.map(productEntity => new Produto(
            productEntity.ProdutoNome,
            categoriaEntity.CategoriaId,
            productEntity.Preco,
            productEntity.ProdutoDescricao
        ));
    
        return products;
    }
}