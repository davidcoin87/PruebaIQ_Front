export class AuditoriaModel {
    id: number;
    nameUser: string;
    dateRegister: Date;

    constructor() {
        this.id = 0;
        this.nameUser = '';
        this.dateRegister = new Date;
    }
}