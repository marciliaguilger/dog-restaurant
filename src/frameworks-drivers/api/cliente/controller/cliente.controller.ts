import { Body, Controller, Get, Inject, NotFoundException, Param, Post } from "@nestjs/common";
import { CreateClienteInput } from "../../../../interface-adapters/presenters/cliente/create-cliente-input";
import { CustomerOutput as ClienteOutput } from "../../../../interface-adapters/presenters/cliente/cliente-output";
import { ApiTags } from "@nestjs/swagger";
import { ClienteInterfaceController } from "src/interface-adapters/controllers/cliente-interface.controller";

@ApiTags('Cliente')
@Controller('clientes')
export class ClienteController {
    constructor(
        @Inject(ClienteInterfaceController)
        private readonly clienteController: ClienteInterfaceController) {}

    @Post()
    async createCliente(@Body() createClienteInput: CreateClienteInput) {
        return { clienteId: await this.clienteController.createCliente(createClienteInput) };
    }

    @Get(':cpf')
    async getClienteByDocument(@Param('cpf') cpf: string): Promise<ClienteOutput> {
        const cliente = await this.clienteController.getClienteByDocument(cpf);
        if (!cliente) {
            throw new NotFoundException(`Cliente com o documento: ${cpf} não encontrado`);
        }
        return new ClienteOutput(cliente.id, cliente.nome, cliente.cpf.numero, cliente.email);
    }

    @Get()
    async getAll(): Promise<ClienteOutput[]> {
        const clientes = await this.clienteController.getAll();
        return clientes.map(cliente => new ClienteOutput(cliente.id, cliente.nome, cliente.cpf.numero, cliente.email));
    }
}