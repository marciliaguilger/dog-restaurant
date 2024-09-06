import { Inject, NotFoundException } from "@nestjs/common";
import { Categoria } from "src/domain/produto/entities/Categoria";
import { Produto } from "src/domain/produto/entities/Produto";
import { IProdutoUseCase } from "src/domain/produto/use-cases/produto-use-case.interface";
import { CategoriaInput } from "src/interface-adapters/presenters/produto/categoria-input";
import { ProdutoInput } from "src/interface-adapters/presenters/produto/produto-input";
import { CategoriaOutput } from "src/interface-adapters/presenters/produto/categoria-output";
import { ProdutoOutput } from "src/interface-adapters/presenters/produto/produto-output";

export class ProdutoInterfaceControlller {
    constructor(
        @Inject(IProdutoUseCase)
        private readonly produtoUseCase: IProdutoUseCase) {}
    
      async getAll(): Promise<ProdutoOutput[]> {
        const produto = await this.produtoUseCase.getAll();
        
        return produto.map(produto => new ProdutoOutput(produto.nome, produto.id, produto.categoria, produto.preco, produto.descricao, produto.ativo));
      }
    
      async getAllCategories(): Promise<CategoriaOutput[]> {
        const categorias = await this.produtoUseCase.getAllCategorias();
    
        return categorias.map(categoria => new CategoriaOutput(categoria.nome, categoria.id));
      }
    
      async getById(id: string): Promise<ProdutoOutput> {
        const produto = await this.produtoUseCase.getById(id);
        if (!produto) {
          throw new NotFoundException(`Produto com id ${id} não encontrado.`);
        }
        return new ProdutoOutput(produto.nome, produto.id, produto.categoria, produto.preco, produto.descricao, produto.ativo);
      }
    
      async getByName(nome: string): Promise<ProdutoOutput> {
        const produto = await this.produtoUseCase.getByNome(nome);
        if (!produto) {
          throw new NotFoundException(`Produto com nome ${nome} não encotrado.`);
        }
        return new ProdutoOutput(produto.nome, produto.id, produto.categoria, produto.preco, produto.descricao, produto.ativo);
      }
    
      async getByCategory(categoria: string): Promise<ProdutoOutput[]> {
        const produtos = await this.produtoUseCase.getByCategoria(categoria);
        if (produtos.length < 1) {
          throw new NotFoundException(`Produto com categoria ${categoria} não encontrado.`);
        }
        return produtos.map(produto => new ProdutoOutput(produto.id, produto.nome, produto.categoria, produto.preco, produto.descricao));
      }
    
      async createProduct(produtoInput: ProdutoInput): Promise<any> {
        const produto = new Produto(produtoInput.nome, produtoInput.categoriaId, produtoInput.preco, produtoInput.descricao, produtoInput.ativo);
        return { 'produtoId': await this.produtoUseCase.create(produto) } ;
      }
    
      async createCategory(categoriaInput: CategoriaInput) {
        const categoria = new Categoria(categoriaInput.nome);
        return {id: this.produtoUseCase.createCategoria(categoria) };
      }
    
      async updateProduct(id: string, produtoInput: ProdutoInput) {
        const produto = new Produto(produtoInput.nome, produtoInput.categoriaId, produtoInput.preco, produtoInput.descricao);
        const produtoAtualizado = await this.produtoUseCase.update(id, produto);
        if (!produtoAtualizado) {
          throw new NotFoundException(`Produto com id ${id} não encontrado.`);
        }
        return {id, message: `Produto atualizado com  sucesso.`};  
      }
      
      async updateProductStatus(id: string, ativo: boolean) {
        const produtoAtualizado = await this.produtoUseCase.updateStatus(id, ativo);
        if (!produtoAtualizado) {
          throw new NotFoundException(`Produto com id ${id} não encontrado.`);
        }
        return {id, message: `Produto atualizado com  sucesso.`};  
      }  
}