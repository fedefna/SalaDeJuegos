import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})

export class RegistroComponent implements OnInit {
  public us = new Usuario();
  public mostrarError = false;
  public errorMessage: String = "";
  registerForm = this.formBuilder.group(
    {
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }
  )

  constructor(private authService: AuthServiceService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  registrarUsuario() {
    const {nombre, email, password } = this.registerForm.value;
    this.us.nombre = nombre;
    this.us.email = email;
    this.us.password = password;

    this.authService.registrar(this.us)
      .then(value => {
        this.router.navigateByUrl('/home');
      })
      .catch(err => {
        this.errorMessage = err;
        this.mostrarError = true;
        console.log('Registration error: ', err.message);
      });
  }

  obtenerEstadoSesion() {
    this.authService.getUserLogged().subscribe(res => {
      console.log(res);
    })
  }
}
