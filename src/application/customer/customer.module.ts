import { Module } from "@nestjs/common";
import { CustomerController } from "./controller/customer.controller";
import { CreateCustomerService } from "src/domain/customer/use-cases/customer-use-case.service";
import { ICreateCustomer } from "src/domain/customer/use-cases/customer-use-case.interface";

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [
      CreateCustomerService,
      {
        provide: ICreateCustomer,
        useClass: CreateCustomerService,
      }
    ],
  })
  export class CustomerModule {}
  