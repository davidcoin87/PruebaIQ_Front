export class ResponseModel {
    href: string;
    message: string ;
    response: boolean;
    result: any;

    constructor(){
        this.href = '';
        this.message = '';
        this.response = false;
    }
}