import { Inject, Injectable } from "@nestjs/common";
import { Product } from "src/domain/product/entities/Product";
import { IProductRepository } from "src/domain/product/repositories/product-repository.interface";
import { Repository } from "typeorm";
import { Products } from "../entities/product.entity";
import { Categories } from "../entities/category.entity";

@Injectable()
export class ProductRepository implements IProductRepository {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepo: Repository<Products>,
        @Inject('CATEGORY_REPOSITORY')
        private categoryRepo: Repository<Categories>,                
      ) {}

    async create(product: Product) {
        const productEntity = new Products();
        productEntity.ProductId = product.id;
        productEntity.ProductName = product.name;
        productEntity.ProductDescription = product.description;
        productEntity.Price = product.price;
        productEntity.CategoryId = product.category; 
    
        await this.productRepo.save(productEntity);
    }
    async update(id: string, product: Product): Promise<string> {
        const productEntity = await this.productRepo
            .createQueryBuilder("Products")
            .where("Products.ProductId = :id", { id: id })
            .getOne();
    
        if (!productEntity) return undefined;
    
        productEntity.ProductName = product.name;
        productEntity.ProductDescription = product.description;
        productEntity.Price = product.price;
        productEntity.CategoryId = product.category;
    
        await this.productRepo.save(productEntity);
    
        return id;
    }
    async getAllCategories(): Promise<Categories[]> {
        const categories = await this.categoryRepo.find();
        return categories;    
    }

    async getByName(name: string): Promise<Product | undefined> {
        const productEntity = await this.productRepo
            .createQueryBuilder("Products")
            .where("Products.ProductName = :name", { name: name })
            .getOne();
    
        if (!productEntity) return undefined;
    
        const categoryEntity = await this.categoryRepo
            .createQueryBuilder("Categories")
            .where("Categories.CategoryId = :id", { id: productEntity.CategoryId })
            .getOne();
    
        if (!categoryEntity) return undefined;
    
        const product = new Product(
            productEntity.ProductName,
            categoryEntity.CategoryDescription,
            productEntity.Price,
            productEntity.ProductDescription
        );
    
        return product;
    }

    async getById(id: string): Promise<Product | undefined> {
        const productEntity = await this.productRepo
            .createQueryBuilder("Products")
            .where("Products.ProductId = :id", { id: id })
            .getOne();
    
        if (!productEntity) return undefined;
    
        const categoryEntity = await this.categoryRepo
            .createQueryBuilder("Categories")
            .where("Categories.ProductId = :id", { id: productEntity.CategoryId })
            .getOne();
    
        if (!categoryEntity) return undefined;
    
        const product = new Product(
            productEntity.ProductName,
            categoryEntity.CategoryDescription,
            productEntity.Price,
            productEntity.ProductDescription
        );
    
        return product;    
    }
    async getByCategory(category: string): Promise<Product[] | undefined> {
        const categoryEntity = await this.categoryRepo
            .createQueryBuilder("Categories")
            .where("Categories.CategoryDescription = :category", { category: category })
            .getOne();
    
        if (!categoryEntity) return undefined;
    
        const productEntities = await this.productRepo
            .createQueryBuilder("Products")
            .where("Products.CategoryId = :categoryId", { categoryId: categoryEntity.CategoryId })
            .getMany();
    
        const products = productEntities.map(productEntity => new Product(
            productEntity.ProductName,
            categoryEntity.CategoryId,
            productEntity.Price,
            productEntity.ProductDescription
        ));
    
        return products;
    }
}