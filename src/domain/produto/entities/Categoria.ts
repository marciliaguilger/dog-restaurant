export class Categoria {
    id: string;
    nome: string;

    constructor(nome: string, id?: string) {
        if (!this.validateName(nome)) throw new Error("Nome inválido");

        this.nome = nome;
        this.id = id;
    }    

    private validateName(nome: string): boolean {
        return (nome!= null && nome.trim().length > 3);
    }
}