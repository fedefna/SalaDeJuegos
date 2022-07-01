import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Usuario } from 'src/app/classes/usuario';
import { Puntajes } from 'src/app/Interfaces/puntajes.interface';
import { AuthServiceService } from './auth-service.service';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PuntajesService {

  private puntajesRef: AngularFirestoreCollection<Puntajes>;
  private fecha = new Date().toISOString();
  public usuario: Usuario = new Usuario();
  public puntajes: Puntajes[] = [];

  constructor(private authService: AuthServiceService, private afs: AngularFirestore) {
    this.puntajesRef = this.afs.collection('Puntajes');
    this.authService.getUserLogged().subscribe(user => {

      if (!user) {
        return;
      }
      if (!user.email) {
        return;
      }

      if (user.displayName == null) {
        this.usuario.nombre = user.email;
      } else {
        this.usuario.nombre = user.displayName;;
      }
      this.usuario.id = user.uid;
      this.usuario.email = user.email;
    });
  }


  traerResultados() {
    this.puntajesRef = this.afs.collection<Puntajes>('Puntajes', ref => ref.orderBy('fecha', 'desc').limit(10));
    return this.puntajesRef.valueChanges().pipe(
      map((puntajes: Puntajes[]) => {
        this.puntajes = [];
        for (let puntaje of puntajes) {
          this.puntajes.unshift(puntaje);
        }
      })
    );
      
  }

  guardarResultado(points: string, game: string, result: string) {

    let resultado: Puntajes = {
      juego: game,
      jugador: this.usuario.nombre,
      resultado: result,
      puntos: points,
      fecha: this.fecha,
      email: this.usuario.email,
      uid: this.usuario.id
    }

    return this.puntajesRef.add(resultado);
  }
}
