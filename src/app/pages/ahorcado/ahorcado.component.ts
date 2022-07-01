import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuntajesService } from 'src/app/services/puntajes.service';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.css']
})
export class AhorcadoComponent implements OnInit {


  gameName='Ahorcado';
  palabrasPosibles = ['LABORATORIO','CELULAR','COMPUTADORA','CARTUCHERA','TECLADO','HELADERA','ZAPATILLA','AHORCADO','HELICOPTERO','ELECTRICIDAD','ESTETOSCOPIO','INTESTINO','EQUIPAMIENTO','PROFESIONAL','DIAFRAGMA'];
  letras = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','Ñ','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  palabraRandom:string = '_ ';
  pistas:string='';
  cantidadDeLetras:number=0;

  intentosFallidos:number=0; 
  victoria:boolean = false;
  derrota:boolean = false;
  
  
  constructor(private router: Router,private puntaje:PuntajesService){
    this.iniciarJuego();
  }

  ngOnInit(): void {
  }

  iniciarJuego(){
    this.palabraRandom = this.palabrasPosibles[Math.floor(Math.random() * this.palabrasPosibles.length)];
    this.cantidadDeLetras = this.palabraRandom.length;
    this.pistas= '_ '.repeat(this.cantidadDeLetras);
  }

  validarLetra(letra:string){
    if(this.palabraRandom.includes(letra)){
      this.actualizarPista(letra);
    }else{
      this.sumarUnIntentoFallido();
    }
    this.validarResultado();
  }

  sumarUnIntentoFallido(){
    this.intentosFallidos = this.intentosFallidos+1;
  }

  actualizarPista(letra:string){
    const pistaEnArray = this.pistas.split(' ');
    for(let i = 0; i < this.cantidadDeLetras; i++){
      if(this.palabraRandom[i] === letra){
        pistaEnArray[i] = letra;
      }
    }
    this.pistas = pistaEnArray.join(' ');
  }

  validarResultado(){
    if (this.pistas.includes('_')) {
      if (this.intentosFallidos===6) {
        this.derrota=true;
        this.puntaje.guardarResultado("-",this.gameName,"Derrota");
      }
    }else{
      this.victoria=true;
      this.puntaje.guardarResultado("-",this.gameName,"Victoria");

    }
  }

  restart(){
    this.iniciarJuego();
    this.intentosFallidos=0;
    this.victoria=false;
    this.derrota=false;
  }

  goHome(){
    this.router.navigate(['home']);
  }


}
