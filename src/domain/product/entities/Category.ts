export class Category {
    id: string;
    name: string;

    constructor(name: string, id?: string) {
        if (!this.validateName(name)) throw new Error("Invalid name");

        this.name = name;
        this.id = id;
    }    

    private validateName(name: string): boolean {
        return (name!= null && name.trim().length > 3);
    }
}