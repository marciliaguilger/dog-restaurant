import { TestingModule, Test } from "@nestjs/testing";
import { Pedido } from "../entities/pedido.entity";
import { IPedidoRepository } from "../repositories/order-repository.interface";
import { PedidoUseCase } from "./pedido-use-case.service";

describe('PedidoUseCase', () => {
    let service: PedidoUseCase;
    let mockPedidoRepository: Partial<IPedidoRepository>;
  
    beforeEach(async () => {
      mockPedidoRepository = {
        getAllPedidos: jest.fn().mockResolvedValue([new Pedido('1'), new Pedido('2')]),
        getPedidoById: jest.fn().mockImplementation((id: string) =>
          Promise.resolve(new Pedido(id))
        ),
        getPedidosByStatus: jest.fn().mockResolvedValue([new Pedido('1')]),
        updatePedido: jest.fn(),
        createPedido: jest.fn().mockImplementation((pedido: Pedido) =>
          Promise.resolve(pedido.pedidoId)
        )
      };
  
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          PedidoUseCase,
          { provide: IPedidoRepository, useValue: mockPedidoRepository }
        ],
      }).compile();
  
      service = module.get<PedidoUseCase>(PedidoUseCase);
    });
  
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  
    it('getAllPedidos should return an array of pedidos', async () => {
      const result = await service.getAllPedidos();
      expect(result).toHaveLength(2);
      expect(mockPedidoRepository.getAllPedidos).toHaveBeenCalled();
    });      
  
    it('getPedidoById should throw if pedido does not exist', async () => {
      jest.spyOn(mockPedidoRepository, 'getPedidoById').mockResolvedValueOnce(undefined);
      await expect(service.getPedidoById('3')).rejects.toThrow('Pedido with ID 3 not found.');
    });    
  });