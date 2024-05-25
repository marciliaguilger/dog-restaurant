import { Body, Controller, Get, HttpStatus, Inject, NotFoundException, Param, Post, Req, Res } from "@nestjs/common";
import { CreateClienteInput as CreateClienteInput } from "../input/create-cliente-input";
import { CustomerOutput as ClienteOutput } from "../output/cliente-output";
import { ICustomerUseCase as IClienteUseCase } from "src/domain/cliente/use-cases/customer-use-case.interface";
import { ApiTags } from "@nestjs/swagger";
import { Customer as Customer } from "src/domain/cliente/entities/cliente.entity";

@ApiTags('Cliente')
@Controller('clientes')
export class ClienteController {
  constructor(
    @Inject(IClienteUseCase)
    private readonly clienteUseCase: IClienteUseCase) {}

  @Post()
  async createCliente(@Body() createClienteInput: CreateClienteInput): Promise<string> {
    const cliente = new Customer(createClienteInput.nome,createClienteInput.documento ,createClienteInput.email);
    return this.clienteUseCase.create(cliente);
  }

  @Get(':cpf')
  async getClienteByDocument(@Param('cpf') cpf: string): Promise<ClienteOutput > {
    const cliente = await this.clienteUseCase.getByCpf(cpf);
    if (!cliente) {
      throw new NotFoundException(`Cliente com o documento: ${document} não encontrado`);
    }
    return new ClienteOutput(cliente.id, cliente.nome, cliente.cpf.numero, cliente.email);
  }

  @Get()
  async getAll(): Promise<ClienteOutput[]> {
    const cliente = await this.clienteUseCase.getAll();
    
    return cliente.map(cliente => new ClienteOutput(cliente.id, cliente.nome, cliente.cpf.numero, cliente.email));
  }
}