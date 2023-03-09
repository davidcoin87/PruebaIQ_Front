
export interface AuthResponse {
    response: boolean;
    message?: string;
    token?: string;
    result?: any;
}

export interface Usuario {
    nombreusuario: string;
}