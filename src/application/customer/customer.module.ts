import { Module } from "@nestjs/common";
import { CustomerController } from "./controller/customer.controller";
import { CreateCustomerService } from "src/domain/customer/use-cases/create-customer.service";

@Module({
    imports: [],
    controllers: [CustomerController],
    providers: [CreateCustomerService],
  })
  export class CustomerModule {}
  