import { Customer } from "../entities/Customer";

export interface ICustomerRepository {
    create(customer: Customer);
    getByCpf(cpf: string): Promise<Customer>;
}
export const ICustomerRepository = Symbol('ICustomerRepository');