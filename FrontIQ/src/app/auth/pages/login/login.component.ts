import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    nameuser: ['Alejo', [Validators.required]],//se ponen valores por defecto para no estar llenando información
    pass: ['123456', [Validators.required]],//se ponen valores por defecto para no estar llenando información
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private AuthService: AuthService) { }

  login(){
    console.log(this.miFormulario.value);
    //console.log(this.miFormulario.valid);
    const { nameuser, pass } = this.miFormulario.value;

    this.AuthService.login( nameuser, pass )
      .subscribe( response => {
        console.log(response);
        if(response === true) {
          this.router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', response, 'error');
        }
      });
  }

}
