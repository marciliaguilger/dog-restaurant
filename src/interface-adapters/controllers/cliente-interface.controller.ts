import { Inject, NotFoundException } from "@nestjs/common";
import { Cliente } from "src/domain/cliente/entities/cliente.entity";
import { IClienteUseCase } from "src/domain/cliente/use-cases/cliente-use-case.interface";
import { CreateClienteInput } from "src/interface-adapters/presenters/cliente/create-cliente-input";
import { CustomerOutput as ClienteOutput } from "src/interface-adapters/presenters/cliente/cliente-output";

export class ClienteInterfaceController {
    constructor(
        @Inject(IClienteUseCase)
        private readonly clienteUseCase: IClienteUseCase) {}

    async createCliente(createClienteInput: CreateClienteInput): Promise<any> {
        const cliente = new Cliente(createClienteInput.nome, createClienteInput.documento, createClienteInput.email);
        return { clienteId: await this.clienteUseCase.create(cliente) };
    }

    async getClienteByDocument(cpf: string): Promise<ClienteOutput> {
        const cliente = await this.clienteUseCase.getByCpf(cpf);
        if (!cliente) {
            throw new NotFoundException(`Cliente com o documento: ${cpf} não encontrado`);
        }
        return new ClienteOutput(cliente.id, cliente.nome, cliente.cpf.numero, cliente.email);
    }

    async getAll(): Promise<ClienteOutput[]> {
        const clientes = await this.clienteUseCase.getAll();
        return clientes.map(cliente => new ClienteOutput(cliente.id, cliente.nome, cliente.cpf.numero, cliente.email));
    }
}