import { Customer } from "../entities/Customer";

export interface ICreateCustomer {
    create(customer: Customer): Promise<string>;
    getByDocument(id: string): Promise<Customer>;
    getAll(): Promise<Customer[]>;
}

export const ICreateCustomer = Symbol('ICreateCustomer');
