export abstract class BaseComboProduto {
    private _produtoId: string;
    private _categoriaId: string;
    private _preco: number = 0;
    
    get produtoId(): string {
        return this._produtoId;
    }

    get preco(): number {
        return this._preco;
    }

    get categoriaId(): string {
        return this._categoriaId;
    }

    constructor(produtoId: string, categoriaId: string, preco: number) {
        this._produtoId = produtoId;
        this._preco = preco
        this._categoriaId = categoriaId
    }
}