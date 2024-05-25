import { Module } from "@nestjs/common";
import { ClienteController } from "./controller/cliente.controller";
import { CustomerUseCase as ClienteUseCase } from "src/domain/cliente/use-cases/customer-use-case.service";
import { ICustomerRepository as IClienteRepository } from "src/domain/cliente/repositories/customer-repository.interface";
import { databaseProviders } from "src/infrastructure/data/database.provider";
import { CustomerRepository as ClienteRepository } from "src/infrastructure/data/customer/repositories/customer-repository";
import { customerProviders as clienteProviders } from "src/infrastructure/data/customer/repositories/customer.provider";
import { DataBaseModule } from "src/infrastructure/data/database.module";

@Module({
    imports: [DataBaseModule],
    controllers: [ClienteController],
    providers: [
      ... clienteProviders,
      ... databaseProviders,
      ClienteRepository,
      {
        provide: IClienteRepository,
        useClass: ClienteRepository
      },
      ClienteUseCase,
      {
        provide: IClienteRepository,
        useClass: ClienteUseCase
      }
    ],
  })
  export class ClienteModule {}
  