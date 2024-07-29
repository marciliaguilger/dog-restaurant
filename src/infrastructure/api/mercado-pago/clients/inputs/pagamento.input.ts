export class PaymentInput {
    installments: number;
    payer: Payer;
    token?: string;
    transaction_amount: number;

    constructor(installments: number, payer: Payer, transaction_amount: number, token?: string) {
        this.installments = installments;
        this.payer = payer;
        this.transaction_amount = transaction_amount;
        this.token = token;
    }
}

class Payer {
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}