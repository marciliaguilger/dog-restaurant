export class Customer {
    
    name: string;
    id: string;
    document: string;
    email: string;

    constructor(name: string, document: string, email: string){
        this.name = name;
        this.document = document;
        this.email = email;
    }

}