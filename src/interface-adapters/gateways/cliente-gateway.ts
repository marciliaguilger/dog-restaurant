import { Cliente } from "src/domain/cliente/entities/cliente.entity";
import { IClienteGateway } from "src/domain/cliente/ports/cliente-gateway.interface";

export class ClienteGateway implements IClienteGateway{
    create(customer: Cliente) {
        throw new Error("Method not implemented.");
    }
    getByCpf(cpf: string): Promise<Cliente> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Cliente[]> {
        throw new Error("Method not implemented.");
    }
}