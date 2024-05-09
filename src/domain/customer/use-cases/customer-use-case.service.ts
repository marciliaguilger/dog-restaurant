import { Injectable } from "@nestjs/common";
import { Customer } from "../entities/Customer";
import { ICreateCustomer } from "./customer-use-case.interface";
import { randomUUID } from "crypto";

@Injectable()
export class CreateCustomerService implements ICreateCustomer {
  private readonly customers: Customer[] = [];
  
  async getByDocument(document: string): Promise<Customer> {
    return this.customers.find(c => c.document === document)
  }
  
  async getAll(): Promise<Customer[]> {
    return this.customers
  }

  async create(customer: Customer): Promise<string> {
    customer.id = randomUUID()

    this.customers.push(customer);
    return customer.id;
  }
}