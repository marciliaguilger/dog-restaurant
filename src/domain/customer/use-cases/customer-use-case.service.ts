import { Inject, Injectable } from "@nestjs/common";
import { Customer } from "../entities/Customer";
import { ICustomerUseCase } from "./customer-use-case.interface";
import { randomUUID } from "crypto";
import { ICustomerRepository } from "../repositories/customer-repository.interface";

@Injectable()
export class CustomerUseCase implements ICustomerUseCase {
  constructor(
    @Inject(ICustomerRepository) 
    private readonly customerRepository: ICustomerRepository) {}
    
  private readonly customers: Customer[] = [];
  
  async getByDocument(document: string): Promise<Customer | undefined> {
    return this.customerRepository.getByDocument(document); 
  }
  
  async getAll(): Promise<Customer[]> {
    return this.customers
  }

  async create(customer: Customer): Promise<string> {
    customer.id = randomUUID()

    this.customerRepository.create(customer);
    return customer.id;
  }
}