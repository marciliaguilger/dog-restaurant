import { Customer } from "../entities/Customer";

export interface ICustomerRepository {
    create(customer: Customer);
    getByDocument(document: string): Promise<Customer>;
}
export const ICustomerRepository = Symbol('ICustomerRepository');