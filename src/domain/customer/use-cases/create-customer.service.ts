import { Injectable } from "@nestjs/common";
import { Customer } from "../entities/Customer";
import { ICreateCustomer } from "./create-customer.interface";
import { UUID, randomUUID } from "crypto";

@Injectable()
    export class CreateCustomerService implements ICreateCustomer {
      private readonly customers: Customer[] = [];

      async create(customer: Customer): Promise<string> {
        customer.id = randomUUID()

        this.customers.push(customer);
        return customer.id;
      }
    }