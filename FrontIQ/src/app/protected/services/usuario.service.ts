import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UsuarioModel } from '../models/usuario.models';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: UsuarioModel = new UsuarioModel();  
  
  constructor( private http: HttpClient,
               private commond: CommonService,
               private auth: AuthService ) { }

  getUsuarios() {
    console.log(`${ this.commond.getUrl() }/Usuario`, { headers: this.auth.getHeaders() });
    console.log('token', this.auth.getHeaders());
    return this.http.get( `${ this.commond.getUrl() }/Usuario`)
    .pipe(
      map ( this.crearArreglo )
    );
  }

  getUsuario( id: string ): Observable<any>{
    console.log(id)
    return this.http.get( `${ this.commond.getUrl() }/Usuario/${id}`, { headers: this.auth.getHeaders() } );
  }

  crearUsuario( usuario: UsuarioModel ){
    return this.http.post( `${ this.commond.getUrl() }/Usuario`, usuario, { headers: this.auth.getHeaders() } );
  }

  actualizarUsuario( usuario: UsuarioModel ){
    return this.http.put( `${ this.commond.getUrl() }/Usuario/${ usuario.id }`, usuario, { headers: this.auth.getHeaders() } );
  }

  eliminarUsuario( id: string ){
    return this.http.delete( `${ this.commond.getUrl() }/Usuario/${id}`, { headers: this.auth.getHeaders() } );
  }



  //Modulos de apoyo
  private crearArreglo( usuarioObj: object ) {
    const usuarios: UsuarioModel[] = [];

    if(usuarioObj === null) { return []; }

    Object.keys (usuarioObj).forEach ( (key:string) => {
      const usuario: UsuarioModel = usuarioObj [key];
      usuarios.push( usuario );
    });
    return usuarios;
  }
}
