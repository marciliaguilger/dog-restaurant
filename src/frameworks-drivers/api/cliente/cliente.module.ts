import { Module } from "@nestjs/common";
import { ClienteController } from "./controller/cliente.controller";
import { IClienteUseCase } from "src/domain/cliente/use-cases/cliente-use-case.interface";
import { ClienteUseCase } from "src/domain/cliente/use-cases/cliente-use-case.service";
import { IClienteRepository } from "src/domain/cliente/ports/cliente-repository.interface";
import { DataBaseModule } from "src/frameworks-drivers/data/database.module";
import { customerProviders } from "src/frameworks-drivers/data/cliente/repositories/customer.provider";
import { databaseProviders } from "src/frameworks-drivers/data/database.provider";
import { ClienteRepository } from "src/frameworks-drivers/data/cliente/repositories/cliente-repository";

@Module({
    imports: [DataBaseModule],
    controllers: [ClienteController],
    providers: [
      ... customerProviders,
      ... databaseProviders,
      ClienteRepository,
      {
        provide: IClienteRepository,
        useClass: ClienteRepository
      },
      ClienteUseCase,
      {
        provide: IClienteUseCase,
        useClass: ClienteUseCase
      }
    ],
  })
  export class ClienteModule {}
  