import { Module } from "@nestjs/common";
import { CustomerController } from "./controller/customer.controller";
import { CustomerUseCase } from "src/domain/customer/use-cases/customer-use-case.service";
import { ICustomerUseCase } from "src/domain/customer/use-cases/customer-use-case.interface";
import { ICustomerRepository } from "src/domain/customer/repositories/customer-repository.interface";
import { CustomerRepository } from "src/infrastructure/customer/repositories/customer-repository";
import { DataBaseModule } from "src/infrastructure/data/database.module";
import { customerProviders } from "src/infrastructure/data/customer.provider";
import { databaseProviders } from "src/infrastructure/data/database.provider";
import { IOrderUseCase } from "src/domain/order/use-cases/order-use-case.interface";
import { OrderUseCase } from "src/domain/order/use-cases/order-use-case.service";

@Module({
    imports: [DataBaseModule],
    controllers: [CustomerController],
    providers: [
      ... customerProviders,
      ... databaseProviders,
      CustomerRepository,
      {
        provide: ICustomerRepository,
        useClass: CustomerRepository
      },
      CustomerUseCase,
      {
        provide: ICustomerUseCase,
        useClass: CustomerUseCase
      }
    ],
  })
  export class CustomerModule {}
  