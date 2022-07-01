import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario : Usuario;
  email: string = '';
  pass: string = '';

  constructor(
    private authSvc: AuthServiceService, 
    private formBuilder: FormBuilder,
    private router : Router) {
    this.usuario = new Usuario();
   }

   loginForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    }
  )

  ngOnInit(): void {
  }

  async login()
  {
    const {email,password} = this.loginForm.value;
    this.usuario.email = email;
    this.usuario.password = password;
    
    try
    {
      const user = await this.authSvc.login(this.usuario);

      if(user)
      {
        localStorage.setItem('token', this.usuario.email);
        this.router.navigate(['/home']);
        console.log("Logueado!",user);
      }
      
    }
    catch(error)
    {
      console.log(error);
    }
    
  }
  

  accesoRapido(){
    this.loginForm.controls['email'].setValue("fede@fede.com");
    this.loginForm.controls['password'].setValue("Fede1234");
  }

  ingresarConGoogle(){
    this.authSvc.googleLogin();
  }


}
