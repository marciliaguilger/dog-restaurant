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

    async updateStatus(id: string, active: boolean) {
        const productEntity = await this.productRepo
            .createQueryBuilder("Products")
            .where("Products.ProdutoId = :id", { id: id })
            .getOne();
    
        if (!productEntity) return undefined;
    
        productEntity.Ativo = active;
    
        await this.productRepo.save(productEntity);
    
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

    async update(id: string, product: Produto): Promise<string> {
        const productEntity = await this.productRepo
            .createQueryBuilder("Products")
            .where("Products.ProdutoId = :id", { id: id })
            .getOne();
    
        if (!productEntity) return undefined;
    
        productEntity.ProdutoNome = product.nome;
        productEntity.ProdutoDescricao = product.descricao;
        productEntity.Preco = product.preco;
    
        await this.productRepo.save(productEntity);
    
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
                console.error(`Error creating categoria: ${error.message}`);

            }
        }).filter(categoria => categoria !== undefined);
    
        return categories;
    }

    async getAll(): Promise<Produto[]> {
        const productsEntities = await this.productRepo
            .createQueryBuilder("Products")
            .getMany();

        const products: Produto[] = productsEntities.map(entity => {
            try {
                return new Produto(entity.ProdutoNome, entity.CategoriaId, entity.Preco, entity.ProdutoDescricao, entity.Ativo, entity.ProdutoId);
            } catch (error) {
                console.error(`Error creating product: ${error.message}`);

            }
        }).filter(products => products !== undefined);
    
        return products;
    }

    async getByNome(name: string): Promise<Produto | undefined> {
        const productEntity = await this.productRepo
            .createQueryBuilder("Products")
            .where("Products.ProdutoNome = :name", { name: name })
            .getOne();
    
        if (!productEntity) return undefined;
        
        const product = new Produto(
            productEntity.ProdutoNome,
            productEntity.CategoriaId,
            productEntity.Preco,
            productEntity.ProdutoDescricao,
            productEntity.Ativo,        
            productEntity.ProdutoId, 
        );
    
        return product;
    }

    async getById(id: string): Promise<Produto | undefined> {
        const productEntity = await this.productRepo
            .createQueryBuilder("Products")
            .where("Products.ProdutoId = :id", { id: id })
            .getOne();
    
        if (!productEntity) return undefined;
    
        const product = new Produto(
            productEntity.ProdutoNome,
            productEntity.CategoriaId,
            productEntity.Preco,
            productEntity.ProdutoDescricao,
            productEntity.Ativo,        
            productEntity.ProdutoId,    
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
            .createQueryBuilder("Products")
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