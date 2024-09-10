import { Cliente } from "../entities/cliente.entity";

export interface IClienteGateway {
    create(customer: Cliente);
    getByCpf(cpf: string): Promise<Cliente>;
    getAll(): Promise<Cliente[]>;
}

export const IClienteGateway=Symbol('IClienteGateway')