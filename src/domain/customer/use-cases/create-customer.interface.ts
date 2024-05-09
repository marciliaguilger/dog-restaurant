import { UUID } from "crypto";
import { Customer } from "../entities/Customer";

export interface ICreateCustomer {
    create(customer: Customer): Promise<string>;
}