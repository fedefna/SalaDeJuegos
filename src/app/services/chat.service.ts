
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Mensaje } from 'src/app/Interfaces/mensaje.interface';
import { Usuario } from 'src/app/classes/usuario';
import { AuthServiceService } from './auth-service.service';


@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  public chats: Mensaje[] = [];
  public usuario: Usuario = new Usuario();

  constructor(private afs: AngularFirestore, private authService: AuthServiceService) {
    this.itemsCollection = this.afs.collection<Mensaje>('Chats', ref => ref.orderBy('fecha', 'desc').limit(5));

    this.authService.getUserLogged().subscribe(user => {

      if (!user) {
        return;
      }
      if (!user.email) {
        return;
      }

      if (user.displayName == null) {
        console.log("displayName es null. Asigno user.email al nombre ",user.email);
        this.usuario.nombre = user.email;
      } else {
        console.log("displayName NO es null, lo asigno al nombre ",user.displayName);
        this.usuario.nombre = user.displayName;
      }
      console.log("asigno el uid ",user.uid);
      this.usuario.id=user.uid;
      console.log("asigno el mail ",user.email);
      this.usuario.email = user.email;
    })

  }


  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>('Chats', ref => ref.orderBy('fecha', 'desc').limit(5));
    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
      })
    );
  }

  agregarMensaje(texto: string) {
    let mensaje: Mensaje = {
      nombre: this.usuario.nombre,
      uid: this.usuario.id,
      mensaje: texto,
      fecha: new Date().getTime()
    }
    console.log({mensaje});
    return this.itemsCollection.add(mensaje);
  }
}
