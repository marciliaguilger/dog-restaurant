import { Controller, Inject, Get, Param, Query, Post, Body } from "@nestjs/common";
import { IManageProduct } from "src/domain/product/use-cases/product-use-case.interface";
import { ProductInput } from "../input/product-input";
import { Product } from "src/domain/product/entities/Product";
import { ProductOutput } from "../output/product-output";

@Controller('products')
export class ProductController {
  constructor(
    @Inject(IManageProduct)
    private readonly manageProductUseCase: IManageProduct) {}

  @Get()
  async getAll(): Promise<ProductOutput[]> {
    const product = await this.manageProductUseCase.getAll();
    
    return product.map(product => new ProductOutput(product.id, product.name, product.category, product.price, product.description));
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<ProductOutput> {
    const product = await this.manageProductUseCase.getById(id);
    return new ProductOutput(product.id, product.name, product.category, product.price, product.description);
  }

  @Get('search/by-name')
  async getByName(@Query('name') name: string): Promise<ProductOutput> {
    const product = await this.manageProductUseCase.getByName(name);
    return new ProductOutput(product.id, product.name, product.category, product.price, product.description);
  }

  @Get('search/by-category')
  async getByCategory(@Query('category') category: string): Promise<ProductOutput> {
    const product = await this.manageProductUseCase.getByCategory(category);
    return new ProductOutput(product.id, product.name, product.category, product.price, product.description);
  }

  @Post()
  async createProduct(@Body() productInput: ProductInput): Promise<string> {
    const product = new Product(productInput.id, productInput.name, productInput.category, productInput.price, productInput.description);
    return this.createProduct(product);
  }
}