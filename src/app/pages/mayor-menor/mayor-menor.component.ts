import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuntajesService } from 'src/app/services/puntajes.service';

@Component({
  selector: 'app-mayor-menor',
  templateUrl: './mayor-menor.component.html',
  styleUrls: ['./mayor-menor.component.css']
})
export class MayorMenorComponent implements OnInit {

  gameName:string = 'Mayor o Menor?';
  cartasPosibles = [1,2,3,4,5,6,7,8,9,10,11,12,13];
  cartaRandom:number=0;
  intentosFallidos:number=0; 
  puntos:number=0;
  victoria:boolean = false;
  derrota:boolean = false;

  constructor(private router: Router,private puntaje:PuntajesService) {
    this.iniciarJuego();
   }

  ngOnInit(): void {
  }

  iniciarJuego(){
    this.generarCartaRandom();
  }

  generarCartaRandom(){
    let aux=Math.floor(Math.random() * this.cartasPosibles.length);
    this.cartaRandom = aux+1;
  }

  adivinarMayor(){
    let aux = this.cartaRandom;
    this.generarCartaRandom();
    while (aux===this.cartaRandom) {
      this.generarCartaRandom();
    }

    if (this.cartaRandom>aux) {
      this.sumarPunto();
    }else{
      this.sumarIntentoFallido();
    }

    this.validarResultado();
  }

  sumarPunto(){
    this.puntos= this.puntos+1;
  }
  
  sumarIntentoFallido(){
    this.intentosFallidos= this.intentosFallidos+1;
  }

  adivinarMenor(){
    let aux = this.cartaRandom;
    this.generarCartaRandom();
    while (aux===this.cartaRandom) {
      this.generarCartaRandom();
    }
    
    if (this.cartaRandom<aux) {
      this.sumarPunto();
    }else{
      this.sumarIntentoFallido();
    }

    this.validarResultado();
  }

  validarResultado(){
    if (this.intentosFallidos===7) {
      this.derrota=true;
      this.puntaje.guardarResultado(this.puntos.toString(),this.gameName,"Derrota");
    }else{
      if(this.puntos===7){
        this.victoria=true;
        this.puntaje.guardarResultado(this.puntos.toString(),this.gameName,"Victoria");
      }
    }
  }

  goHome(){
    this.router.navigate(['home']);
  }

  restart(){
    this.iniciarJuego();
    this.intentosFallidos=0;
    this.victoria=false;
    this.derrota=false;
    this.puntos=0;
  }

}
