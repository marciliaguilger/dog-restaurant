export class GetPedidoOutput {
    pedidoId: string;
    clienteId: string;
    clienteNome: string;
    criado: Date;
    status: string;
    combos: GetComboOutput[];
    totalValor: number;
    descontoValor?: number;
}

export class GetComboOutput {
    comboId: string;
    items: ComboItemOutput[];
    comboValor: number;
}

export class ComboItemOutput {
    produtoId: string;
    categoria: string;
    preco: number;
}