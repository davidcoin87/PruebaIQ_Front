export class UsuarioModel {
    id: number;
    nameUser: string;
    password: string;

    constructor() {
        this.id = 0;
        this.nameUser = '';
        this.password = '';
    }
}