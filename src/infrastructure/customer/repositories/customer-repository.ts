import { Inject, Injectable } from "@nestjs/common";
import { Customer } from "src/domain/customer/entities/customer.entity";
import { ICustomerRepository } from "src/domain/customer/repositories/customer-repository.interface";
import { Customers } from "src/infrastructure/data/entities/customer.entity";
import { Repository } from "typeorm";

@Injectable()
export class CustomerRepository implements ICustomerRepository  {
    constructor(
        @Inject('CUSTOMER_REPOSITORY')
        private customerRepo: Repository<Customers>,
      ) {}
    
    async getByCpf(cpf: string): Promise<Customer | undefined> {
        const customers = await this.customerRepo
        .createQueryBuilder("Customers")
        .where("Customers.CustomerDocument = :document", { document: cpf })
        .getOne()
        
        if (customers === null) return undefined;
        const customer = new Customer(customers.CustomerName, customers.CustomerDocument, customers.Email);
        return customer
    }
    
    create(customer: Customer) {
        //const customerEntity = new CustomerEntity(customer.id, customer.name, customer.document, customer.email);
        const customerEntity = new Customers()
        customerEntity.CustomerId = customer.id;
        customerEntity.CustomerName = customer.name;
        customerEntity.CustomerDocument = customer.cpf.number;
        customerEntity.DocumentType = "CPF";
        customerEntity.Email = customer.email;

        this.customerRepo.create(customerEntity);
        this.customerRepo.save(customerEntity);
    }
}