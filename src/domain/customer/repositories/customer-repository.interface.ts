import { Customer } from "../entities/Customer";

export interface ICustomerRepository {

    create(customer: Customer)

}