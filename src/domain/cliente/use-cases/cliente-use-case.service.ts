import { Inject, Injectable } from "@nestjs/common";
import { Cliente } from "../entities/cliente.entity";
import { IClienteUseCase } from "./cliente-use-case.interface";
import { IClienteGateway } from "../ports/cliente-gateway.interface";

@Injectable()
export class ClienteUseCase implements IClienteUseCase {
  constructor(
    @Inject(IClienteGateway) 
    private readonly clienteGateway: IClienteGateway) {}
  
  async getByCpf(cpf: string): Promise<Cliente | undefined> {
    return this.clienteGateway.getByCpf(cpf); 
  }
  
  async getAll(): Promise<Cliente[]> {
    return this.clienteGateway.getAll(); 
  }

  async create(cliente: Cliente): Promise<string> {
    this.clienteGateway.create(cliente);
    return cliente.id;
  }
}