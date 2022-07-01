import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EncuestaService } from 'src/app/services/encuesta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public formulario!: FormGroup;
  public encuesta?: Observable<any[]>;
  public elemento: any;
  

  constructor(
    private router: Router,
    private frB: FormBuilder,
    public unaEncuesta: EncuestaService,
  ) { }

  ngOnInit(): void {
    this.formulario = this.frB.group({
      'nombre': ['', [Validators.required]],
      'apellido': ['', Validators.required],
      'edad': ['', [Validators.required, Validators.min(18), Validators.max(110)]],
      'telefono': ['', [Validators.required]],
      'juegoFavorito': ['', [Validators.required]],
      'comentario': ['', [Validators.required]],
      'juegoNuevo': ['', [Validators.required]],
    });
  }

  aceptar(): void {
    
    var nombre = this.formulario?.controls['nombre'].value;
    var apellido = this.formulario?.controls['apellido'].value;
    var edad = this.formulario?.controls['edad'].value;
    var telefono = this.formulario?.controls['telefono'].value;
    var juegoFavorito = this.obtenerValor(this.formulario?.controls['juegoFavorito'].value);
    var comentario = this.formulario?.controls['comentario'].value;
    var juegoNuevo = this.formulario?.controls['juegoNuevo'].value;


    this.unaEncuesta.guardarEncuesta(nombre, apellido, edad, telefono, juegoFavorito, comentario, juegoNuevo)?.finally(() => {
      this.muestraMensaje("correcta");
    }).catch((err: any) => {
      this.muestraMensaje("error");
    });
  }

  obtenerValor(juegoFavorito: string): string {
    switch (juegoFavorito) {
      case 'A':
        juegoFavorito = "Ahorcado";
        break;
      case 'M':
        juegoFavorito = "Mayor o menor";
        break;
      case 'B':
        juegoFavorito = "Adivina palabra";
        break;
      case 'P':
        juegoFavorito = "Preguntados";
        break;
    }
    return juegoFavorito;
  }


  //probando el swal
  muestraMensaje(aux: string) {
    if (aux == "correcta") {
      Swal.fire({
        icon: 'success',
        title: '¡Gracias por participar de la encuesta!',
        text: 'Encuesta enviada! ',
      }).finally(() => {
        this.router.navigate(['/home']);
      });
    }
    if (aux == "error") {
      Swal.fire({
        icon: 'error',
        title: 'ERROR!',
        text: 'Ocurrio un error en la carga de la encuesta',
      }).finally(() => {
        this.router.navigate(['/home']);
      });
    }
  }


}
