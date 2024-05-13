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

    validateDocument(): boolean {
        this.document = this.document.replace(".","").replace("-","");
        return this.document.length > 9; 
    }

    validateName(): boolean {   
        return this.name.length > 3;
    }
    
    validateEmail(): boolean {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(this.email.toLowerCase());
    }
}