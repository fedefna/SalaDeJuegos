import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PuntajesService } from 'src/app/services/puntajes.service';

@Component({
  selector: 'app-adivinar-palabra',
  templateUrl: './adivinar-palabra.component.html',
  styleUrls: ['./adivinar-palabra.component.css']
})

export class AdivinarPalabraComponent implements OnInit {

  gameName='Adivina Palabra';
  palabrasPosibles = ['PAPA', 'MOUSE', 'ARBOL', 'AHORCADO'];
  palabraRandom: string = '';
  palabraRandomArray: string[] = [];
  letrasRandom: string[] = [];
  letrasElegidas: string[] = [];

  intentosFallidos: number = 0;
  puntos: number = 0;
  numeroDePalabra: number = -1;
  victoria: boolean = false;
  derrota: boolean = false;


  constructor(private router: Router,private puntaje:PuntajesService) {
    this.iniciarJuego();
  }

  ngOnInit(): void {
  }

  iniciarJuego() {
    this.letrasElegidas = [];
    this.numeroDePalabra = this.numeroDePalabra + 1;
    this.palabraRandom = this.palabrasPosibles[this.numeroDePalabra];
    this.palabraRandomArray = this.palabraRandom.split("");;
    this.cambiarOrdenLetras(this.palabraRandomArray);
  }

  cambiarOrdenLetras(array: string[]) {
    let arrayAux = array.slice();
    for (let i = 0; i < array.length; i++) {
      let random = Math.floor(Math.random() * arrayAux.length);
      this.letrasRandom.push(arrayAux[random]);
      arrayAux.splice(random, 1);
    }
  }

  agregarLetra(letra: string) {
    let pos: number = 0;
    for (let i = 0; i < this.letrasRandom.length; i++) {
      if (this.letrasRandom[i] === letra) {
        pos = i;
        break;
      }
    }
    this.letrasRandom.splice(pos, 1);
    this.letrasElegidas.push(letra);

    this.validarResultado();
  }

  sacarLetra(letra: string) {
    let pos: number = 0;
    for (let i = 0; i < this.letrasElegidas.length; i++) {
      if (this.letrasElegidas[i] === letra) {
        pos = i;
        break;
      }
    }
    this.letrasElegidas.splice(pos, 1);
    this.letrasRandom.push(letra);

    this.validarResultado();
  }

  validarResultado() {

    if (this.palabraRandomArray.length == this.letrasElegidas.length) {

      for (let index = 0; index < this.palabraRandomArray.length; index++) {

        if (this.palabraRandomArray[index] === this.letrasElegidas[index]) {

          if (index === this.palabraRandomArray.length - 1) {
            this.sumarPunto();
            if (this.puntos == 4) {
              this.victoria = true;
              this.puntaje.guardarResultado(this.puntos.toString(),this.gameName,"Victoria");
            }else{this.iniciarJuego();}
            break;
          }
        } else {
          this.sumarUnIntentoFallido();
          break;
        }
      }
    }
    console.log("aca veo q onda :"+this.puntos);
    if (this.intentosFallidos === 3) {
      this.derrota = true;
      this.puntaje.guardarResultado(this.puntos.toString(),this.gameName,"Derrota");
    }
    
  }

  sumarPunto() {
    this.puntos = this.puntos + 1;
  }

  sumarUnIntentoFallido() {
    this.intentosFallidos = this.intentosFallidos + 1;
  }

  restart() {
    this.intentosFallidos = 0;
    this.victoria = false;
    this.derrota = false;
    this.numeroDePalabra = 0;
    this.puntos = 0;
    this.palabraRandom = '';
    this.palabraRandomArray = [];
    this.letrasRandom = [];
    this.letrasElegidas = [];
    this.iniciarJuego();
  }

  goHome() {
    this.router.navigate(['home']);
  }



}
