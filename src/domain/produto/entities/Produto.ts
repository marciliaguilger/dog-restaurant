export class Produto {
    id: string;
    nome: string;
    categoria: string;
    preco: number;
    descricao: string;
    ativo:boolean;

    constructor(nome: string, categoria:string, preco: number, descricao: string, ativo?: boolean, id?: string) {
        if (!this.validateName(nome)) throw new Error("Nome inválido");
        if (!this.validatePrice(preco)) throw new Error("Preço inválido");
        if (!this.validateDescription(descricao)) throw new Error("Descrição inválida");
        if (!this.validateCategory(categoria)) throw new Error("Categoria inválida");

        this.nome = nome;
        this.categoria = categoria;
        this.preco = preco;
        this.descricao = descricao;
        this.ativo = ativo;
        this.id = id;
    }

    private validateName(nome: string): boolean {
        return (nome!= null && nome.trim().length > 3);
    }

    private validatePrice(preco: number): boolean {
        return (preco!= null && preco > 0);
    }

    private validateDescription(descricao: string): boolean {
        return (descricao!= null && descricao.trim().length > 5);
    }

    private validateCategory(categoria: string): boolean {
        return (categoria!= null);
    }
}