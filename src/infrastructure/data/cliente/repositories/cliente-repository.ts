import { Inject, Injectable } from "@nestjs/common";
import { Cliente } from "src/domain/cliente/entities/cliente.entity";
import { IClienteRepository } from "src/domain/cliente/repositories/cliente-repository.interface";

@Injectable()
export class ClienteRepository implements IClienteRepository  {
    constructor(
       
      ) {}
    
    async getAll(): Promise<Cliente[]> {
        return null 
    }
    
    async getByCpf(cpf: string): Promise<Cliente | undefined> {
        return null
    }
    
    create(customer: Cliente) {
    }
}