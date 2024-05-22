import { Inject, Injectable } from "@nestjs/common";
import { Product } from "src/domain/product/entities/Product";
import { IProductRepository } from "src/domain/product/repositories/product-repository.interface";
import { Repository } from "typeorm";
import { Category } from "src/domain/product/entities/Category";
import { Products } from "../../entities/product.entity";
import { Categories } from "../../entities/category.entity";

@Injectable()
export class ProductRepository implements IProductRepository {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepo: Repository<Products>,
        @Inject('CATEGORY_REPOSITORY')
        private categoryRepo: Repository<Categories>,
      ) {}

    async updateStatus(id: string, active: boolean) {
        const productEntity = await this.productRepo
            .createQueryBuilder("Products")
            .where("Products.ProductId = :id", { id: id })
            .getOne();
    
        if (!productEntity) return undefined;
    
        productEntity.Active = active;
    
        await this.productRepo.save(productEntity);
    
        return id;    
    }

    async create(product: Product) {
        const productEntity = new Products();
        productEntity.ProductId = product.id;
        productEntity.ProductName = product.name;
        productEntity.ProductDescription = product.description;
        productEntity.Price = product.price;
        productEntity.CategoryId = product.category; 
        productEntity.Active = product.active; 
    
        await this.productRepo.save(productEntity);
    }

    async createCategory(category: Category) {
        const categoryEntity = new Categories();

        categoryEntity.CategoryId = category.id;
        categoryEntity.CategoryDescription = category.name;

        await this.categoryRepo.save(categoryEntity);
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
    
        await this.productRepo.save(productEntity);
    
        return id;
    }    
    async getAllCategories(): Promise<Category[]> {
        const categoriesEntities = await this.categoryRepo
            .createQueryBuilder("Categories")
            .getMany();

        const categories: Category[] = categoriesEntities.map(entity => {
            try {
                return new Category(entity.CategoryDescription, entity.CategoryId);
            } catch (error) {
                console.error(`Error creating category: ${error.message}`);

            }
        }).filter(category => category !== undefined);
    
        return categories;
    }

    async getAll(): Promise<Product[]> {
        const productsEntities = await this.productRepo
            .createQueryBuilder("Products")
            .getMany();

        const products: Product[] = productsEntities.map(entity => {
            try {
                return new Product(entity.ProductName, entity.CategoryId, entity.Price, entity.ProductDescription, entity.Active, entity.ProductId);
            } catch (error) {
                console.error(`Error creating product: ${error.message}`);

            }
        }).filter(products => products !== undefined);
    
        return products;
    }

    async getByName(name: string): Promise<Product | undefined> {
        const productEntity = await this.productRepo
            .createQueryBuilder("Products")
            .where("Products.ProductName = :name", { name: name })
            .getOne();
    
        if (!productEntity) return undefined;
        
        const product = new Product(
            productEntity.ProductName,
            productEntity.CategoryId,
            productEntity.Price,
            productEntity.ProductDescription,
            productEntity.Active,        
            productEntity.ProductId, 
        );
    
        return product;
    }

    async getById(id: string): Promise<Product | undefined> {
        const productEntity = await this.productRepo
            .createQueryBuilder("Products")
            .where("Products.ProductId = :id", { id: id })
            .getOne();
    
        if (!productEntity) return undefined;
    
        const product = new Product(
            productEntity.ProductName,
            productEntity.CategoryId,
            productEntity.Price,
            productEntity.ProductDescription,
            productEntity.Active,        
            productEntity.ProductId,    
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