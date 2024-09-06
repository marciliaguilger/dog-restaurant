import { Controller, Inject, Get, Param, Post, Body, NotFoundException, Put } from "@nestjs/common";
import { ProdutoInput } from "../../../../interface-adapters/presenters/produto/produto-input";
import { ProdutoOutput } from "../../../../interface-adapters/presenters/produto/produto-output";
import { CategoriaOutput } from "../../../../interface-adapters/presenters/produto/categoria-output";
import { CategoriaInput } from "../../../../interface-adapters/presenters/produto/categoria-input";
import { Categoria } from "src/domain/produto/entities/Categoria";
import { ApiTags } from "@nestjs/swagger";
import { ProdutoInterfaceControlller } from "src/interface-adapters/controllers/produto-interface.controller";

@ApiTags('Produtos')
@Controller('produtos')
export class ProdutoController {
  constructor(
    @Inject(ProdutoInterfaceControlller)
    private readonly produtoController: ProdutoInterfaceControlller) {}

  @Get()
  async getAll(): Promise<ProdutoOutput[]> {
    const produto = await this.produtoController.getAll();
    
    return produto.map(produto => new ProdutoOutput(produto.nome, produto.id, produto.categoria, produto.preco, produto.descricao, produto.ativo));
  }

  @Get('/categorias')
  async getAllCategories(): Promise<CategoriaOutput[]> {
    const categorias = await this.produtoController.getAllCategories();

    return categorias.map(categoria => new CategoriaOutput(categoria.nome, categoria.id));
  }

  @Get('/:id')
  async getById(@Param('id') id: string): Promise<ProdutoOutput> {
    const produto = await this.produtoController.getById(id);
    if (!produto) {
      throw new NotFoundException(`Produto com id ${id} não encontrado.`);
    }
    return new ProdutoOutput(produto.nome, produto.id, produto.categoria, produto.preco, produto.descricao, produto.ativo);
  }

  @Get('/nome/:nome')
  async getByName(@Param('nome') nome: string): Promise<ProdutoOutput> {
    const produto = await this.produtoController.getByName(nome);
    if (!produto) {
      throw new NotFoundException(`Produto com nome ${nome} não encotrado.`);
    }
    return new ProdutoOutput(produto.nome, produto.id, produto.categoria, produto.preco, produto.descricao, produto.ativo);
  }

  @Get('/categorias/:categoria')
  async getByCategory(@Param('categoria') categoria: string): Promise<ProdutoOutput[]> {
    const produtos = await this.produtoController.getByCategory(categoria);
    if (produtos.length < 1) {
      throw new NotFoundException(`Produto com categoria ${categoria} não encontrado.`);
    }
    return produtos.map(produto => new ProdutoOutput(produto.id, produto.nome, produto.categoria, produto.preco, produto.descricao));
  }

  @Post()
  async createProduct(@Body() produtoInput: ProdutoInput): Promise<any> {
    return { 'produtoId': await this.produtoController.createProduct(produtoInput) } ;
  }

  @Post('/categorias')
  async createCategory(@Body() categoriaInput: CategoriaInput) {
    const categoria = new Categoria(categoriaInput.nome);
    return {id: this.produtoController.createCategory(categoria) };
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() produtoInput: ProdutoInput) {
    const produtoAtualizado = await this.produtoController.updateProduct(id, produtoInput);
    if (!produtoAtualizado) {
      throw new NotFoundException(`Produto com id ${id} não encontrado.`);
    }
    return {id, message: `Produto atualizado com  sucesso.`};  
  }
  
  @Put('/:id/status')
  async updateProductStatus(@Param('id') id: string, @Body() ativo: boolean) {
    const produtoAtualizado = await this.produtoController.updateProductStatus(id, ativo);
    if (!produtoAtualizado) {
      throw new NotFoundException(`Produto com id ${id} não encontrado.`);
    }
    return {id, message: `Produto atualizado com  sucesso.`};  
  }  
}