import { Controller, Post } from "@nestjs/common";
import { Customer } from "src/domain/customer/entities/Customer";
import { ICreateCustomer } from "src/domain/customer/use-cases/create-customer.interface";

@Controller()
export class CustomerController {
  constructor(private readonly createCustomerUseCase: ICreateCustomer) {}

  @Post("/customer")
  async createCustomer(): Promise<string> {
    const customer = new Customer('Marcilia','12345','email');
    return this.createCustomerUseCase.create(customer);
  }
}