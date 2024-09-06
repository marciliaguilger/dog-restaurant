import { Inject, Injectable } from "@nestjs/common";
import { Cliente } from "src/domain/cliente/entities/cliente.entity";
import { IClienteRepository } from "src/domain/cliente/ports/cliente-repository.interface";
import { Repository } from "typeorm";
import { Clientes } from "../entities/customer.entity";

@Injectable()
export class ClienteRepository implements IClienteRepository  {
    constructor(
        @Inject('CLIENTE_REPOSITORY')
        private clienteRepo: Repository<Clientes>,
      ) {}
    
    async getAll(): Promise<Cliente[]> {
        const clientes = await this.clienteRepo
        .createQueryBuilder("Clientes")
        .getMany()

        const clientesList: Cliente[] = []

        clientes.forEach(c => {
            clientesList.push(new Cliente(c.ClienteNome, c.ClienteDocumento, c.Email))
        })

        return clientesList
    }
    
    async getByCpf(cpf: string): Promise<Cliente | undefined> {
        const customers = await this.clienteRepo
        .createQueryBuilder("Clientes")
        .where("Clientes.ClienteDocumento = :document", { document: cpf })
        .getOne()
        
        if (customers === null) return undefined;
        const customer = new Cliente(customers.ClienteNome, customers.ClienteDocumento, customers.Email);
        return customer
    }
    
    create(customer: Cliente) {
        const customerEntity = new Clientes()
        customerEntity.ClienteId = customer.id;
        customerEntity.ClienteNome = customer.nome;
        customerEntity.ClienteDocumento = customer.cpf.numero;
        customerEntity.TipoDocumento = "CPF";
        customerEntity.Email = customer.email;

        this.clienteRepo.create(customerEntity);
        this.clienteRepo.save(customerEntity);
    }
}