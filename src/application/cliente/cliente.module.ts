import { Module } from "@nestjs/common";
import { ClienteController } from "./controller/cliente.controller";
import { CustomerUseCase } from "src/domain/customer/use-cases/customer-use-case.service";
import { ICustomerRepository } from "src/domain/customer/repositories/customer-repository.interface";
import { databaseProviders } from "src/infrastructure/data/database.provider";
import { CustomerRepository } from "src/infrastructure/data/customer/repositories/customer-repository";
import { customerProviders } from "src/infrastructure/data/customer/repositories/customer.provider";
import { DataBaseModule } from "src/infrastructure/data/database.module";

@Module({
    imports: [DataBaseModule],
    controllers: [ClienteController],
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
        provide: ICustomerRepository,
        useClass: CustomerUseCase
      }
    ],
  })
  export class ClienteModule {}
  