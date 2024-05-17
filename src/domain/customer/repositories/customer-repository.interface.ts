import { Customer } from "../entities/customer.entity";

export interface ICustomerRepository {
    create(customer: Customer);
    getByCpf(cpf: string): Promise<Customer>;
}
export const ICustomerRepository = Symbol('ICustomerRepository');