import { TestingModule, Test } from "@nestjs/testing";
import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";
import { IProdutoRepository } from "../repositories/product-repository.interface";
import { ProdutoUseCase } from "./produto-use-case.service";

describe('ProdutoUseCase', () => {
    let service: ProdutoUseCase;
    let mockProdutoRepository: Partial<IProdutoRepository>;
  
    beforeEach(async () => {
      mockProdutoRepository = {
        updateStatus: jest.fn().mockResolvedValue(undefined),
        getAllCategorias: jest.fn().mockResolvedValue([]),
        update: jest.fn().mockResolvedValue(undefined),
        create: jest.fn().mockImplementation((produto: Produto) => Promise.resolve(produto.id)),
        createCategoria: jest.fn().mockImplementation((categoria: Categoria) => Promise.resolve(categoria.id)),
        getByCategoria: jest.fn().mockResolvedValue([]),
        getAll: jest.fn().mockResolvedValue([]),
        getByNome: jest.fn().mockResolvedValue((produto: Produto)=> Promise.resolve(produto)),
        getById: jest.fn().mockResolvedValue((produto: Produto)=> Promise.resolve(produto))
      };
  
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ProdutoUseCase,
          {
            provide: IProdutoRepository,
            useValue: mockProdutoRepository
          }
        ],
      }).compile();
  
      service = module.get<ProdutoUseCase>(ProdutoUseCase);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    it('should update status of a product', async () => {
      const id = 'some-id';
      const ativo = true;
      await service.updateStatus(id, ativo);
      expect(mockProdutoRepository.updateStatus).toHaveBeenCalledWith(id, ativo);
    });
  
    it('should get all categories', async () => {
      await service.getAllCategorias();
      expect(mockProdutoRepository.getAllCategorias).toHaveBeenCalled();
    });
  
    it('should get product by name', async () => {
      const nome = 'some-name';
      await service.getByNome(nome);
      expect(mockProdutoRepository.getByNome).toHaveBeenCalledWith(nome);
    });
  
    it('should get product by id', async () => {
      const id = 'some-id';
      await service.getById(id);
      expect(mockProdutoRepository.getById).toHaveBeenCalledWith(id);
    });
  
    it('should get products by category', async () => {
      const categoria = 'some-category';
      await service.getByCategoria(categoria);
      expect(mockProdutoRepository.getByCategoria).toHaveBeenCalledWith(categoria);
    });
  
    it('should get all products', async () => {
      await service.getAll();
      expect(mockProdutoRepository.getAll).toHaveBeenCalled();
    });
  });