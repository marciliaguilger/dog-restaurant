export class CategoriaOutput {
    id: string;
    nome: string;

    constructor(nome: string, id: string) {
        this.nome = nome;
        this.id = id;
    }
}