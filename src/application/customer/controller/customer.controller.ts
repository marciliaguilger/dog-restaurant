import { Body, Controller, Get, Inject, Param, Post, Req } from "@nestjs/common";
import { Customer } from "src/domain/customer/entities/Customer";
import { CreateCustomerInput } from "../input/create-customer-input";
import { CustomerOutput } from "../output/customer-output";
import { ICreateCustomer } from "src/domain/customer/use-cases/customer-use-case.interface";

@Controller('customers')
export class CustomerController {
  constructor(
    @Inject(ICreateCustomer)
    private readonly createCustomerUseCase: ICreateCustomer) {}

  @Post()
  async createCustomer(@Body() createCustomerInput: CreateCustomerInput): Promise<string> {
    const customer = new Customer(createCustomerInput.name,createCustomerInput.document ,createCustomerInput.email);
    return this.createCustomerUseCase.create(customer);
  }

  @Get(':document')
  async getCustomerByDocumetn(@Param('document') document: string): Promise<CustomerOutput> {
    const customer = await this.createCustomerUseCase.getByDocument(document);

    return new CustomerOutput(customer.id, customer.name, customer.document, customer.email);
  }

  @Get()
  async getAll(): Promise<CustomerOutput[]> {
    const customer = await this.createCustomerUseCase.getAll();
    
    return customer.map(customer => new CustomerOutput(customer.id, customer.name, customer.document, customer.email));
  }
}