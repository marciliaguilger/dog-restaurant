import { Module } from "@nestjs/common";
import { ClienteController } from "./controller/cliente.controller";
import { IClienteUseCase } from "src/domain/cliente/use-cases/cliente-use-case.interface";
import { ClienteUseCase } from "src/domain/cliente/use-cases/cliente-use-case.service";
import { IClienteRepository } from "src/domain/cliente/repositories/cliente-repository.interface";
import { ClienteRepository } from "src/infrastructure/data/cliente/repositories/cliente-repository";

@Module({
    controllers: [ClienteController],
    providers: [
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
  