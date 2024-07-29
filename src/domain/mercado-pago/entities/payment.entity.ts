export class Payment {
    installments: number;
    payer: Payer;
    token?: string;
    transactionAmount: number
}

class Payer {
    email: string;    
}
  