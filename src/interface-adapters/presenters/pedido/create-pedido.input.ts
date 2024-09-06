export class CreatePedidoInput {
    clienteId: string;
    combos: ComboInput[];
}


export class ComboInput {
    lancheId?: string;
    sobremesaId?: string;
    bebidaId?: string;
    acompanhamentoId?: string;
}