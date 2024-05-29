export class ProdutoOutput {        
    id: string;
    nome: string;
    categoria: string;
    preco: number;
    descricao: string;
    ativo?: boolean;
    
    constructor(nome: string, id: string, categoria: string, preco: number, descricao: string, ativo?: boolean) {
        this.nome = nome;
        this.id = id;
        this.categoria = categoria;
        this.preco = preco;
        this.descricao = descricao;
        this.ativo = ativo
    }
}