import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuditoriaModel } from '../models/auditoria.models';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  auditoria: AuditoriaModel = new AuditoriaModel();

  constructor( private http: HttpClient,
               private commond: CommonService ) { }

  getAuditorias() {
    return this.http.get(`${ this.commond.getUrl() }/auditoria`)
    .pipe(
      map( this.crearArreglo )
    );
  }


  //Modulos de apoyo
  private crearArreglo( auditoriaObj: object ) {
    const auditorias: AuditoriaModel[] = [];

    if(auditoriaObj === null) { return []; }

    Object.keys (auditoriaObj).forEach ( (key:string) => {
      const auditoria: AuditoriaModel = auditoriaObj [key];
      auditorias.push( auditoria );
    });
    return auditorias;
  }
}
