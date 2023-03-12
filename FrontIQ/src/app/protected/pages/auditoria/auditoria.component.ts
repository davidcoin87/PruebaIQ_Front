import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

import { AuditoriaService } from '../../services/auditoria.service';
import { AuditoriaModel } from '../../models/auditoria.models';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {

  regs: AuditoriaModel[] = [];
  title = "Registros de Acceso";
  cargando = false;
  pageSize = 10;
  desde: number = 0;
  hasta: number = 10

  constructor( private auditoriaService: AuditoriaService,
               public common: CommonService ) { }

  ngOnInit(): void {
    console.log('Auditoria');
    this.cargando = true;

    this.auditoriaService.getAuditorias()
    .subscribe( resp => {
      console.log(resp);
      this.regs = resp;
      this.cargando = false;
    })
  }

  cambiarpagina(e: PageEvent){
    //console.log(e);
    this.desde = e.pageIndex * e.pageSize;
    this.hasta = this.desde + e.pageSize;
  }

}
