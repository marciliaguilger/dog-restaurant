import { Customer } from "src/domain/customer/entities/Customer";
import { ICustomerRepository } from "src/domain/customer/repositories/customer-repository.interface";

export class CustomerRepository implements ICustomerRepository {
    create(customer: Customer) {
        throw new Error("Method not implemented.");
    }

}