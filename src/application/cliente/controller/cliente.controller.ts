import { Body, Controller, Get, HttpStatus, Inject, NotFoundException, Param, Post, Req, Res } from "@nestjs/common";
import { CreateClienteInput as CreateClienteInput } from "../input/create-cliente-input";
import { CustomerOutput as ClienteOutput } from "../output/cliente-output";
import { ICustomerUseCase } from "src/domain/customer/use-cases/customer-use-case.interface";
import { ApiTags } from "@nestjs/swagger";
import { Customer as Customer } from "src/domain/customer/entities/customer.entity";

@ApiTags('Cliente')
@Controller('clientes')
export class ClienteController {
  constructor(
    @Inject(ICustomerUseCase)
    private readonly customerUseCase: ICustomerUseCase) {}

  @Post()
  async createCliente(@Body() createClienteInput: CreateClienteInput): Promise<string> {
    const cliente = new Customer(createClienteInput.nome,createClienteInput.documento ,createClienteInput.email);
    return this.customerUseCase.create(cliente);
  }

  @Get(':cpf')
  async getClienteByDocument(@Param('cpf') cpf: string): Promise<ClienteOutput > {
    const cliente = await this.customerUseCase.getByCpf(cpf);
    if (!cliente) {
      throw new NotFoundException(`Cliente com o documento: ${document} não encontrado`);
    }
    return new ClienteOutput(cliente.id, cliente.nome, cliente.cpf.numero, cliente.email);
  }

  @Get()
  async getAll(): Promise<ClienteOutput[]> {
    const cliente = await this.customerUseCase.getAll();
    
    return cliente.map(cliente => new ClienteOutput(cliente.id, cliente.nome, cliente.cpf.numero, cliente.email));
  }
}