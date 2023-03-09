import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

import { AuditoriaService } from '../../services/auditoria.service';
import { AuditoriaModel } from '../../models/auditoria.models';

@Component({
  selector: 'app-auditoria',
  templateUrl: './auditoria.component.html',
  styleUrls: ['./auditoria.component.css']
})
export class AuditoriaComponent implements OnInit {

  regs: AuditoriaModel[] = [];
  title = "Registros de Acceso";
  cargando = false;

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

}
