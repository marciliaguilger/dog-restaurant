import { TestingModule, Test } from "@nestjs/testing";
import { Categoria } from "../entities/Categoria";
import { Produto } from "../entities/Produto";
import { IProdutoRepository } from "../ports/product-repository.interface";
import { ProdutoUseCase } from "./produto-use-case.service";
import { IProdutoGateway } from "../ports/product-gateway.interface";

describe('ProdutoUseCase', () => {
    let service: ProdutoUseCase;
    let mockProdutoGateway: Partial<IProdutoGateway>;
  
    beforeEach(async () => {
      mockProdutoGateway = {
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
            provide: IProdutoGateway,
            useValue: mockProdutoGateway
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
      expect(mockProdutoGateway.updateStatus).toHaveBeenCalledWith(id, ativo);
    });
  
    it('should get all categories', async () => {
      await service.getAllCategorias();
      expect(mockProdutoGateway.getAllCategorias).toHaveBeenCalled();
    });
  
    it('should get product by name', async () => {
      const nome = 'some-name';
      await service.getByNome(nome);
      expect(mockProdutoGateway.getByNome).toHaveBeenCalledWith(nome);
    });
  
    it('should get product by id', async () => {
      const id = 'some-id';
      await service.getById(id);
      expect(mockProdutoGateway.getById).toHaveBeenCalledWith(id);
    });
  
    it('should get products by category', async () => {
      const categoria = 'some-category';
      await service.getByCategoria(categoria);
      expect(mockProdutoGateway.getByCategoria).toHaveBeenCalledWith(categoria);
    });
  
    it('should get all products', async () => {
      await service.getAll();
      expect(mockProdutoGateway.getAll).toHaveBeenCalled();
    });
  });