import { Customer } from "../entities/Customer";

export interface ICustomerUseCase {
    create(customer: Customer): Promise<string>;
    getByDocument(id: string): Promise<Customer>;
    getAll(): Promise<Customer[]>;
}

export const ICustomerUseCase = Symbol('ICustomerUseCase');
