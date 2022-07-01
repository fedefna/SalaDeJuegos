export class Usuario {
    email!: string;
    password!: string;
    nombre!: string;
    id="";

    constructor(){
        this.id = Math.round(Math.random() * (100 - 1) + 1).toString();
    }
}
