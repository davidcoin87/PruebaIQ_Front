import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

import { UsuarioService } from '../../../services/usuario.service';
import { UsuarioModel } from '../../../models/usuario.models';
import { ResponseModel } from '../../../models/baseResponse.models';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario = new UsuarioModel();
  accion = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private usuarioService: UsuarioService ) { }

  

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id') || '0';

    if(id !== '0') {
      this.usuarioService.getUsuario(id)
      .subscribe( ( resp: ResponseModel ) =>{
        this.usuario = resp.result;
        console.log(resp.result);
        this.accion = 'Editar';
      } )
    }else{
      console.log('nuevo');
      this.accion = 'Nuevo'
    }
  }

  guardar( form: NgForm ){
    console.log('Proceso de salvado');
    console.log('Modelo',this.usuario);

    if (form.invalid){
      Object.values(form.controls).forEach ( ctrl => {
        ctrl.markAsTouched();
      });
      Swal.fire(
        {
          title: 'Error',
          text: 'Hacen falta campos obligatorios',
          icon: 'error'
        }
      );
      return;
    }

    Swal.fire(
      {
        title: 'Confirmar Guardar !!!',
        text: '¿Está seguro de guardar el registro actual?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Guardar'
      }
    ).then((result) => {
      if(result.isConfirmed) {
        this.usuario.id = Number(this.usuario.id);
        if(this.usuario.id === 0){
          this.usuarioService.crearUsuario(this.usuario).subscribe(
            (resp: any) => {
              if(resp.error) {
                Swal.fire('Error al crear el Registro','Se presentó un error al crear el registro', 'error');
              } else {
                this.router.navigateByUrl('/dashboard/usuarios');
              }
            }
          );
        } 
        else {
          this.usuarioService.actualizarUsuario(this.usuario).subscribe(
            (resp: any) => {
              if(resp.error){
                Swal.fire('Error al actualizar el Registro','Se presentó un error al actualizar el registro', 'error');
              } else {
                this.router.navigateByUrl('/dashboard/usuarios');
              }
            });
        }
      }
      
    });
  }

}
