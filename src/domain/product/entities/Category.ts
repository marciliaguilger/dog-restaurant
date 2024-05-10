export class Category {
    id: string;
    name: string;

    constructor(id: string, name: string) {
        if (!this.validateId(id)) throw new Error("Invalid ID");
        if (!this.validateName(name)) throw new Error("Invalid name");

        this.id = id;
        this.name = name;
    }

    private validateId(id: string): boolean {
        const idRegex = /^[a-zA-Z0-9]{10}$/;
        return idRegex.test(id);
    }

    private validateName(name: string): boolean {
        return name.trim().length > 3;
    }
}