import { Component, OnInit } from '@angular/core';
import { CommonService } from '../../services/common.service';

import { UsuarioService } from '../../services/usuario.service';
import { UsuarioModel } from '../../models/usuario.models';
import { ResponseModel } from '../../models/baseResponse.models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  regs: UsuarioModel[] = [];  
  title = "Lista de Usuarios";
  cargando = false;

  constructor( public common: CommonService,
               private usuarioService: UsuarioService ) { }

  ngOnInit(): void {
    console.log('Ingreso a Mensualidades');
    this.cargando = true;

    this.usuarioService.getUsuarios()
    .subscribe( resp => {
      console.log(resp);
      this.regs = resp;
      this.cargando = false;
    })
  }

  delete( id: number, i: number) {
    console.log('Eliminar registro');
    Swal.fire(
      {
        title: 'Eliminar Registro',
        text: '¿Desea Eliminar el Registro?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Eliminar'
      }
    ).then((result)=> {
      if (result.isConfirmed) {
        this.usuarioService.eliminarUsuario(id.toString()).subscribe(
          (resp:any) =>
          {
            if (resp.error) {
                Swal.fire('Error al Eliminar el Registro','Se presentó un error al eliminar el registro', 'error');
            } else {
             this.regs.splice(i,1);
              Swal.fire('Registro Eliminado', '', 'success');

            }
          }
        );

      }
    });
  }

}
