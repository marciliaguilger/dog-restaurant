import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Produtos } from '../entities/produto.entity';
import { Categorias } from '../entities/categoria.entity';
import { Produto } from '../../../../domain/produto/entities/Produto';
import { Categoria } from '../../../../domain/produto/entities/Categoria';
import { ProductRepository } from './produto-repository';
describe('ProductRepository', () => {
  let productRepository: ProductRepository;
  let produtoRepo: Repository<Produtos>;
  let categoriaRepo: Repository<Categorias>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductRepository,
        {
          provide: 'PRODUTO_REPOSITORY',
          useClass: Repository,
        },
        {
          provide: 'CATEGORIA_REPOSITORY',
          useClass: Repository,
        },
      ],
    }).compile();
    productRepository = module.get<ProductRepository>(ProductRepository);
    produtoRepo = module.get<Repository<Produtos>>('PRODUTO_REPOSITORY');
    categoriaRepo = module.get<Repository<Categorias>>('CATEGORIA_REPOSITORY');
  });
  it('should be defined', () => {
    expect(productRepository).toBeDefined();
  });
  describe('updateStatus', () => {
    it('should update the status of a product to true', async () => {
      const id = '1';
      const ativo = true;
      const produtoEntity = new Produtos();
      produtoEntity.ProdutoId = id;
      produtoEntity.Ativo = false;
      jest.spyOn(produtoRepo, 'createQueryBuilder').mockReturnValue({
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(produtoEntity),
      } as any);
      jest.spyOn(produtoRepo, 'save').mockResolvedValue(produtoEntity);
      const result = await productRepository.updateStatus(id, ativo);
      expect(result).toBe(id);
      expect(produtoEntity.Ativo).toBe(true);
    });

    it('should update the status of a product to false', async () => {
      const id = '1';
      const ativo = false;
      const produtoEntity = new Produtos();
      produtoEntity.ProdutoId = id;
      produtoEntity.Ativo = true;
      jest.spyOn(produtoRepo, 'createQueryBuilder').mockReturnValue({
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(produtoEntity),
      } as any);
      jest.spyOn(produtoRepo, 'save').mockResolvedValue(produtoEntity);
      const result = await productRepository.updateStatus(id, ativo);
      expect(result).toBe(id);
      expect(produtoEntity.Ativo).toBe(false);
    });
  });
  describe('create', () => {
    it('should create a new product', async () => {
      const produto = new Produto('Product Name', 'CategoryId', 100, 'Description', true);
      const produtoEntity = new Produtos();
      produtoEntity.ProdutoId = produto.id;
      produtoEntity.ProdutoNome = produto.nome;
      produtoEntity.ProdutoDescricao = produto.descricao;
      produtoEntity.Preco = produto.preco;
      produtoEntity.CategoriaId = produto.categoria;
      produtoEntity.Ativo = produto.ativo;
      jest.spyOn(produtoRepo, 'create').mockReturnValue(produtoEntity);
      jest.spyOn(produtoRepo, 'save').mockResolvedValue(produtoEntity);
      productRepository.create(produto);
      expect(produtoRepo.create).toHaveBeenCalledWith(produtoEntity);
      expect(produtoRepo.save).toHaveBeenCalledWith(produtoEntity);
    });
  });
  describe('createCategoria', () => {
    it('should create a new category', async () => {
      const categoria = new Categoria('Category Name');
      const categoriaEntity = new Categorias();
      categoriaEntity.CategoriaId = categoria.id;
      categoriaEntity.CategoriaDescricao = categoria.nome;
      jest.spyOn(categoriaRepo, 'save').mockResolvedValue(categoriaEntity);
      await productRepository.createCategoria(categoria);
      expect(categoriaRepo.save).toHaveBeenCalledWith(categoriaEntity);
    });
  });
});      