import { Module } from "@nestjs/common";
import { ClienteController } from "./controller/cliente.controller";
import { IClienteUseCase } from "src/domain/cliente/use-cases/cliente-use-case.interface";
import { ClienteUseCase } from "src/domain/cliente/use-cases/cliente-use-case.service";
import { IClienteRepository } from "src/domain/cliente/ports/cliente-repository.interface";
import { DataBaseModule } from "src/frameworks-drivers/data/database.module";
import { customerProviders } from "src/frameworks-drivers/data/cliente/repositories/customer.provider";
import { databaseProviders } from "src/frameworks-drivers/data/database.provider";
import { ClienteRepository } from "src/frameworks-drivers/data/cliente/repositories/cliente-repository";
import { ClienteGateway } from "src/interface-adapters/gateways/cliente-gateway";
import { IClienteGateway } from "src/domain/cliente/ports/cliente-gateway.interface";

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
      },
      ClienteGateway,
      {
        provide: IClienteGateway,
        useClass: ClienteGateway
      }
    ],
  })
  export class ClienteModule {}
  