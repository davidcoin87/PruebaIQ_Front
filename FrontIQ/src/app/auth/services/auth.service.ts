import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor( private http: HttpClient ) { }

  login( nameuser: string, pass: string ){
    
    const url = `${ this.baseUrl }/Login/Validar`;
    const body = {nameuser, pass};
    
    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap( resp => {
          if(resp.response){
            localStorage.setItem( 'token', resp.token! );
            this._usuario = {
              nombreusuario: nameuser
            }
          }
        } ),
        map( resp => resp.response ),
        catchError( err => of(err.error.message) )
      )
  }

  validarToken() {

  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    let token = localStorage.getItem('token')!;
    console.log(token);
    return token;
  }

  getHeaders(){
    return new HttpHeaders({Authorization: `${localStorage.getItem('token')!}`});
  }

}
