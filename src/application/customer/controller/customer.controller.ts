import { Body, Controller, Get, HttpStatus, Inject, NotFoundException, Param, Post, Req, Res } from "@nestjs/common";
import { Customer } from "src/domain/customer/entities/Customer";
import { CreateCustomerInput } from "../input/create-customer-input";
import { CustomerOutput } from "../output/customer-output";
import { ICustomerUseCase } from "src/domain/customer/use-cases/customer-use-case.interface";

@Controller('customers')
export class CustomerController {
  constructor(
    @Inject(ICustomerUseCase)
    private readonly customerUseCase: ICustomerUseCase) {}

  @Post()
  async createCustomer(@Body() createCustomerInput: CreateCustomerInput): Promise<string> {
    const customer = new Customer(createCustomerInput.name,createCustomerInput.document ,createCustomerInput.email);
    console.log(customer)
    return this.customerUseCase.create(customer);
  }

  @Get(':document')
  async getCustomerByDocument(@Param('document') document: string): Promise<CustomerOutput > {
    const customer = await this.customerUseCase.getByDocument(document);
    if (!customer) {
      throw new NotFoundException(`Customer with document ${document} not found`);
    }
    return new CustomerOutput(customer.id, customer.name, customer.document, customer.email);
  }

  @Get()
  async getAll(): Promise<CustomerOutput[]> {
    const customer = await this.customerUseCase.getAll();
    
    return customer.map(customer => new CustomerOutput(customer.id, customer.name, customer.document, customer.email));
  }
}