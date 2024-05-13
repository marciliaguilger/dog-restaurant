export class CustomerOutput {

    constructor(id: string, name: string, document: string, email: string)
    {
        this.id = id;
        this.name = name;
        this.document = document;
        this.email = email;
    }

    id: string;
    name: string;
    document: string;
    email: string;
}