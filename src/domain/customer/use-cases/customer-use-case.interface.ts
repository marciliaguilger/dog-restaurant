import { Customer } from "../entities/Customer";

export interface ICustomerUseCase {
    create(customer: Customer): Promise<string>;
    getByCpf(cpf: string): Promise<Customer>;
    getAll(): Promise<Customer[]>;
}

export const ICustomerUseCase = Symbol('ICustomerUseCase');
