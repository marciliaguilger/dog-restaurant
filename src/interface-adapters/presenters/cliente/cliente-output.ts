export class CustomerOutput {
    cpf: Cpf;

    constructor(id: string, nome: string, documento: string, email: string)
    {
        this.id = id;
        this.nome = nome;
        this.documento = documento;
        this.email = email;
    }

    id: string;
    nome: string;
    documento: string;
    email: string;
}

class Cpf{
    numero:string;
}