import { Cliente } from "../entities/cliente.entity";

export interface IClienteUseCase {
    create(cliente: Cliente): Promise<string>;
    getByCpf(cpf: string): Promise<Cliente>;
    getAll(): Promise<Cliente[]>;
}

export const IClienteUseCase = Symbol('IClienteUseCase');
