import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuntajesService } from 'src/app/services/puntajes.service';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {

  //Datos
  pregunta01: string[] = ['Cuando se activan los poderes de Hulk?', 'Cuando hace la sala de juegos', 'Cuando estudia', 'Cuando se enoja', 'Cuando duerme', 'Cuando quiere', 'Cuando se enoja', '1009351'];
  pregunta02: string[] = ['Cual es el primer nombre de Stark?', 'Mony', 'Tony', 'Juan', 'Pedro', 'Lio', 'Tony', '1009368'];
  pregunta03: string[] = ['En que planeta nacio Thanos?', 'Stark', 'Pluton', 'Tierra', 'Marte', 'Thanos', 'Thanos', '1009652'];
  pregunta04: string[] = ['Cuantos hermanos/as tiene Thor?', '0', '1', '2', '3', '4', '2', '1009664'];
  pregunta05: string[] = ['De que material son las garras de Wolverine?', 'Chapa', 'Cobre', 'Acero', 'Aluminio', 'Adamantium', 'Adamantium', '1009718'];

  //'Columnas' de los datos=
  private campoPregunta = 0;
  private campoOpcion1 = 1;
  private campoOpcion2 = 2;
  private campoOpcion3 = 3;
  private campoOpcion4 = 4;
  private campoOpcion5 = 5;
  private campoRespuesta = 6;
  private campoIdMarvel = 7;

  gameName:string = 'Preguntados - Marvel';
  intentosFallidos: number = 0;
  puntos: number = 0;
  victoria: boolean = false;
  derrota: boolean = false;
  preguntaActual: string = '';
  auxNroPregunta = 1;
  botonOpcion1 = '';
  botonOpcion2 = '';
  botonOpcion3 = '';
  botonOpcion4 = '';
  botonOpcion5 = '';
  respuestaActual = '';
  marvelIdActual = '';
  photoUrlActual='';
  path='';
  extension='';
  response:any;

  constructor(private router: Router, private marvelS:MarvelService, private puntaje:PuntajesService) {
    this.seleccionarPregunta();
  }

  ngOnInit(): void {
  }

  seleccionarPregunta() {
    switch (this.auxNroPregunta) {
      case 1:
        this.marvelS.obtenerFoto(this.pregunta01[this.campoIdMarvel]).subscribe((resp:any)=>{this.photoUrlActual=resp.data.results[0].thumbnail.path+'.'+resp.data.results[0].thumbnail.extension},error=>{console.log("Error: ",error)});
        this.preguntaActual = this.pregunta01[this.campoPregunta];
        this.botonOpcion1 = this.pregunta01[this.campoOpcion1];
        this.botonOpcion2 = this.pregunta01[this.campoOpcion2];
        this.botonOpcion3 = this.pregunta01[this.campoOpcion3];
        this.botonOpcion4 = this.pregunta01[this.campoOpcion4];
        this.botonOpcion5 = this.pregunta01[this.campoOpcion5];
        this.respuestaActual = this.pregunta01[this.campoRespuesta];
        this.marvelIdActual = this.pregunta01[this.campoIdMarvel];
        break;

      case 2:
        this.marvelS.obtenerFoto(this.pregunta02[this.campoIdMarvel]).subscribe((resp:any)=>{this.photoUrlActual=resp.data.results[0].thumbnail.path+'.'+resp.data.results[0].thumbnail.extension},error=>{console.log("Error: ",error)});
        this.preguntaActual = this.pregunta02[this.campoPregunta];
        this.botonOpcion1 = this.pregunta02[this.campoOpcion1];
        this.botonOpcion2 = this.pregunta02[this.campoOpcion2];
        this.botonOpcion3 = this.pregunta02[this.campoOpcion3];
        this.botonOpcion4 = this.pregunta02[this.campoOpcion4];
        this.botonOpcion5 = this.pregunta02[this.campoOpcion5];
        this.respuestaActual = this.pregunta02[this.campoRespuesta];
        this.marvelIdActual = this.pregunta02[this.campoIdMarvel];
        break;

      case 3:
        this.marvelS.obtenerFoto(this.pregunta03[this.campoIdMarvel]).subscribe((resp:any)=>{this.photoUrlActual=resp.data.results[0].thumbnail.path+'.'+resp.data.results[0].thumbnail.extension},error=>{console.log("Error: ",error)});
        this.preguntaActual = this.pregunta03[this.campoPregunta];
        this.botonOpcion1 = this.pregunta03[this.campoOpcion1];
        this.botonOpcion2 = this.pregunta03[this.campoOpcion2];
        this.botonOpcion3 = this.pregunta03[this.campoOpcion3];
        this.botonOpcion4 = this.pregunta03[this.campoOpcion4];
        this.botonOpcion5 = this.pregunta03[this.campoOpcion5];
        this.respuestaActual = this.pregunta03[this.campoRespuesta];
        this.marvelIdActual = this.pregunta03[this.campoIdMarvel];
        break;

        case 4:
        this.marvelS.obtenerFoto(this.pregunta04[this.campoIdMarvel]).subscribe((resp:any)=>{this.photoUrlActual=resp.data.results[0].thumbnail.path+'.'+resp.data.results[0].thumbnail.extension},error=>{console.log("Error: ",error)});
        this.preguntaActual = this.pregunta04[this.campoPregunta];
        this.botonOpcion1 = this.pregunta04[this.campoOpcion1];
        this.botonOpcion2 = this.pregunta04[this.campoOpcion2];
        this.botonOpcion3 = this.pregunta04[this.campoOpcion3];
        this.botonOpcion4 = this.pregunta04[this.campoOpcion4];
        this.botonOpcion5 = this.pregunta04[this.campoOpcion5];
        this.respuestaActual = this.pregunta04[this.campoRespuesta];
        this.marvelIdActual = this.pregunta04[this.campoIdMarvel];
        break;

        case 5:
        this.marvelS.obtenerFoto(this.pregunta05[this.campoIdMarvel]).subscribe((resp:any)=>{this.photoUrlActual=resp.data.results[0].thumbnail.path+'.'+resp.data.results[0].thumbnail.extension},error=>{console.log("Error: ",error)});
        this.preguntaActual = this.pregunta05[this.campoPregunta];
        this.botonOpcion1 = this.pregunta05[this.campoOpcion1];
        this.botonOpcion2 = this.pregunta05[this.campoOpcion2];
        this.botonOpcion3 = this.pregunta05[this.campoOpcion3];
        this.botonOpcion4 = this.pregunta05[this.campoOpcion4];
        this.botonOpcion5 = this.pregunta05[this.campoOpcion5];
        this.respuestaActual = this.pregunta05[this.campoRespuesta];
        this.marvelIdActual = this.pregunta05[this.campoIdMarvel];
        break;

      default:
        break;
    }
  }
  
  validarOpcion(opcionElegida:string){
    if(opcionElegida==this.respuestaActual){
      this.sumarPunto();
      this.auxNroPregunta=this.auxNroPregunta+1;
    }else{
      this.sumarIntentoFallido();
    }
    this.validarResultado();
    if (this.victoria==this.derrota) {
      this.seleccionarPregunta();
    }
  }
  
  validarResultado(){
    if (this.intentosFallidos===2) {
      this.derrota=true;
      this.puntaje.guardarResultado(this.puntos.toString(),this.gameName,"Derrota");
    }else{
      if(this.puntos===5){
        this.victoria=true;
        this.puntaje.guardarResultado(this.puntos.toString(),this.gameName,"Victoria");
      }
    }
  }

  sumarPunto(){
    this.puntos= this.puntos+1;
  }
  
  sumarIntentoFallido(){
    this.intentosFallidos= this.intentosFallidos+1;
  }

  goHome() {
    this.router.navigate(['home']);
  }

  restart() {
    this.intentosFallidos = 0;
    this.puntos= 0;
    this.victoria = false;
    this.derrota = false;
    this.preguntaActual = '';
    this.auxNroPregunta = 1;
    this.botonOpcion1 = '';
    this.botonOpcion2 = '';
    this.botonOpcion3 = '';
    this.botonOpcion4 = '';
    this.botonOpcion5 = '';
    this.respuestaActual = '';
    this.marvelIdActual = '';
    this.photoUrlActual='';

    this.seleccionarPregunta();
  }
}
