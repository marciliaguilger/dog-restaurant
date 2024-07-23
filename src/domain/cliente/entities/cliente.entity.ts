import { DomainException } from "../../base/exception/domain.exception";
import { IAggregateRoot } from "../../base/aggregate-root.interface";
import { Cpf } from "../value-objects/cpf";
import { randomUUID } from "crypto";

export class Cliente implements IAggregateRoot {
    
    private _nome: string;
    private _id: string;
    private _cpf: Cpf;
    private _email: string;

    get nome(): string {
        return this._nome;
    }
    
    get id(): string {
        return this._id;
    }

    get cpf(): Cpf {
        return this._cpf;
    }
        
    get email(): string {
        return this._email;
    }
    
    constructor(nome: string, cpf: string, email: string){        
        this._id = randomUUID()
        this._nome = nome;
        this._cpf = new Cpf(cpf);
        this._email = email;

        if(!this.validateName()) throw new DomainException("Nome inválido")
        if(!this.validateEmail) throw new DomainException("E-mail inválido")
    }

    updateEmail(email: string){
        if(!this.validateEmail) throw new DomainException("E-mail inválido")
        this._email = email;
    }


    validateName(): boolean {   
        return this.nome.length > 3;
    }
    
    validateEmail(): boolean {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(this._email.toLowerCase());
    }
}