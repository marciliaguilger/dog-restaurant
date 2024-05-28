import { DomainException } from "src/domain/base/exception/domain.exception";

export class Cpf {
    private _number: string;

    get numero(): string {
        return this._number;
    }

    constructor(number: string){
        this._number = number;

        if(!this.validateCpf()) throw new DomainException("CPF inválido")
    }

    validateCpf(): boolean {
        this._number = this._number.replace(".","").replace("-","");
        return this._number.length === 11
    }
}