import { Module } from "@nestjs/common";
import { CustomerController } from "./controller/customer.controller";
import { CustomerUseCase } from "src/domain/customer/use-cases/customer-use-case.service";
import { ICustomerUseCase } from "src/domain/customer/use-cases/customer-use-case.interface";
import { ICustomerRepository } from "src/domain/customer/repositories/customer-repository.interface";
import { databaseProviders } from "src/infrastructure/data/database.provider";
import { CustomerRepository } from "src/infrastructure/data/customer/repositories/customer-repository";
import { customerProviders } from "src/infrastructure/data/customer/repositories/customer.provider";
import { DataBaseModule } from "src/infrastructure/database/database.module";

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
  