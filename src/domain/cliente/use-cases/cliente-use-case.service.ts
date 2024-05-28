import { Inject, Injectable } from "@nestjs/common";
import { Cliente } from "../entities/cliente.entity";
import { IClienteUseCase } from "./cliente-use-case.interface";
import { IClienteRepository } from "../repositories/cliente-repository.interface";

@Injectable()
export class ClienteUseCase implements IClienteUseCase {
  constructor(
    @Inject(IClienteRepository) 
    private readonly clienteRepository: IClienteRepository) {}
  
  async getByCpf(cpf: string): Promise<Cliente | undefined> {
    return this.clienteRepository.getByCpf(cpf); 
  }
  
  async getAll(): Promise<Cliente[]> {
    return this.clienteRepository.getAll(); 
  }

  async create(cliente: Cliente): Promise<string> {
    this.clienteRepository.create(cliente);
    return cliente.id;
  }
}