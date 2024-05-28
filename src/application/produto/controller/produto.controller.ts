import { Controller, Inject, Get, Param, Post, Body, NotFoundException, Put } from "@nestjs/common";
import { ProdutoInput } from "../input/produto-input";
import { ProdutoOutput } from "../output/produto-output";
import { CategoriaOutput } from "../output/categoria-output";
import { CategoriaInput } from "../input/categoria-input";
import { Categoria } from "src/domain/produto/entities/Categoria";
import { ApiTags } from "@nestjs/swagger";
import { IProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.interface";
import { Produto } from "src/domain/produto/entities/Produto";

@ApiTags('Produtos')
@Controller('produtos')
export class ProdutoController {
  constructor(
    @Inject(IProdutoUseCase)
    private readonly produtoUseCase: IProdutoUseCase) {}

  @Get()
  async getAll(): Promise<ProdutoOutput[]> {
    const produto = await this.produtoUseCase.getAll();
    
    return produto.map(produto => new ProdutoOutput(produto.nome, produto.id, produto.categoria, produto.preco, produto.descricao, produto.ativo));
  }

  @Get('/categorias')
  async getAllCategories(): Promise<CategoriaOutput[]> {
    const categorias = await this.produtoUseCase.getAllCategorias();

    return categorias.map(categoria => new CategoriaOutput(categoria.nome, categoria.id));
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<ProdutoOutput> {
    const produto = await this.produtoUseCase.getById(id);
    if (!produto) {
      throw new NotFoundException(`produto with id ${id} not found`);
    }
    return new ProdutoOutput(produto.nome, produto.id, produto.categoria, produto.preco, produto.descricao, produto.ativo);
  }

  @Get('/nome/:nome')
  async getByName(@Param('nome') nome: string): Promise<ProdutoOutput> {
    const produto = await this.produtoUseCase.getByNome(nome);
    if (!produto) {
      throw new NotFoundException(`Product with nome ${nome} not found`);
    }
    return new ProdutoOutput(produto.nome, produto.id, produto.categoria, produto.preco, produto.descricao, produto.ativo);
  }

  @Get('/categorias/:categoria')
  async getByCategory(@Param('categoria') categoria: string): Promise<ProdutoOutput[]> {
    const produtos = await this.produtoUseCase.getByCategoria(categoria);
    if (produtos.length < 1) {
      throw new NotFoundException(`Product with categoria ${categoria} not found`);
    }
    return produtos.map(produto => new ProdutoOutput(produto.id, produto.nome, produto.categoria, produto.preco, produto.descricao));
  }

  @Post()
  async createProduct(@Body() produtoInput: ProdutoInput): Promise<any> {
    const produto = new Produto(produtoInput.nome, produtoInput.categoriaId, produtoInput.preco, produtoInput.descricao, produtoInput.ativo);
    return { 'produtoId': await this.produtoUseCase.create(produto) } ;
  }

  @Post('/categorias')
  async createCategory(@Body() categoryInput: CategoriaInput): Promise<string> {
    const categoria = new Categoria(categoryInput.nome);
    return this.produtoUseCase.createCategoria(categoria);
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() produtoInput: ProdutoInput): Promise<string> {
    const produto = new Produto(produtoInput.nome, produtoInput.categoriaId, produtoInput.preco, produtoInput.descricao);
    const updatedProduct = await this.produtoUseCase.update(id, produto);
    if (!updatedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return `Product with id ${id} updated successfully`;  
  }
  
  @Put('/:id/status')
  async updateProductStatus(@Param('id') id: string, @Body() active: boolean): Promise<string> {
    const updatedProduct = await this.produtoUseCase.updateStatus(id, active);
    if (!updatedProduct) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return `Product with id ${id} updated successfully`;  
  }  
}