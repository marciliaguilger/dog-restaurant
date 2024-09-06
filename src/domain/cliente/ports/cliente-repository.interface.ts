import { Cliente } from "../entities/cliente.entity";

export interface IClienteRepository {
    create(customer: Cliente);
    getByCpf(cpf: string): Promise<Cliente>;
    getAll(): Promise<Cliente[]>;
}
export const IClienteRepository = Symbol('IClienteRepository');