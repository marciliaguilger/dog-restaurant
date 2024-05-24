import { Controller, Inject, Get, Param, Query, Post, Body, NotFoundException, Put } from "@nestjs/common";
import { IProductUseCase } from "src/domain/product/use-cases/product-use-case.interface";
import { ProductInput } from "../input/product-input";
import { Product } from "src/domain/product/entities/Product";
import { ProductOutput } from "../output/product-output";
import { CategoryOutput } from "../output/category-output";
import { CategoryInput } from "../input/category-input";
import { Category } from "src/domain/product/entities/Category";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(
    @Inject(IProductUseCase)
    private readonly productUseCase: IProductUseCase) {}

  @Get()
  async getAll(): Promise<ProductOutput[]> {
    const product = await this.productUseCase.getAll();
    
    return product.map(product => new ProductOutput(product.name, product.id, product.category, product.price, product.description, product.active));
  }

  @Get('/categories')
  async getAllCategories(): Promise<CategoryOutput[]> {
    const categories = await this.productUseCase.getAllCategories();

    return categories.map(category => new CategoryOutput(category.name, category.id));
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<ProductOutput> {
    const product = await this.productUseCase.getById(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return new ProductOutput(product.name, product.id, product.category, product.price, product.description, product.active);
  }

  @Get('/name/:name')
  async getByName(@Param('name') name: string): Promise<ProductOutput> {
    const product = await this.productUseCase.getByName(name);
    if (!product) {
      throw new NotFoundException(`Product with name ${name} not found`);
    }
    return new ProductOutput(product.name, product.id, product.category, product.price, product.description, product.active);
  }

  @Get('/categories/:category')
  async getByCategory(@Param('category') category: string): Promise<ProductOutput[]> {
    const products = await this.productUseCase.getByCategory(category);
    if (products.length < 1) {
      throw new NotFoundException(`Product with category ${category} not found`);
    }
    return products.map(product => new ProductOutput(product.id, product.name, product.category, product.price, product.description));
  }

  @Post()
  async createProduct(@Body() productInput: ProductInput): Promise<string> {
    const product = new Product(productInput.name, productInput.categoryId, productInput.price, productInput.description, productInput.active);
    return this.productUseCase.create(product);
  }

  @Post('/categories')
  async createCategory(@Body() categoryInput: CategoryInput): Promise<string> {
    const category = new Category(categoryInput.name);
    return this.productUseCase.createCategory(category);
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() productInput: ProductInput): Promise<string> {
    const product = new Product(productInput.name, productInput.categoryId, productInput.price, productInput.description);
    const updatedProduct = await this.productUseCase.update(id, product);
    if (!updatedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return `Product with id ${id} updated successfully`;  
  }
  
  @Put('/:id/status')
  async updateProductStatus(@Param('id') id: string, @Body() active: boolean): Promise<string> {
    const updatedProduct = await this.productUseCase.updateStatus(id, active);
    if (!updatedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return `Product with id ${id} updated successfully`;  
  }  
}