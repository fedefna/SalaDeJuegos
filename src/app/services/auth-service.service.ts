import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Usuario } from '../classes/usuario';
import firebase from "firebase/compat/app";
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private usuariosRef: AngularFirestoreCollection;
  private fechaIngreso = new Date().toISOString();

  constructor(public afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore) {
    this.usuariosRef = this.db.collection('LogUsuairos');
  }

  async login(usuario: Usuario) {
    try {
      return await this.afAuth.signInWithEmailAndPassword(usuario.email, usuario.password)
        .then(result => {
          this.logearUser(usuario);
        });
    }
    catch (error) {
      return error;
    }
  }

  logearUser(usuario: Usuario) {
    return this.usuariosRef.add({ email:usuario.email, fecha: this.fechaIngreso });
  }

  async onLogout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error en logout: ', error);
      return error;
    }
  }

  public getUserLogged() {
    return this.afAuth.authState;
  }

  async googleLogin() {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      return await this.afAuth.signInWithPopup(provider)
        .then(result => {
          console.log('Autenticacion con google ok. User: ', result.user);
          this.router.navigateByUrl('/home');
          if (result.user) {
            const user: Usuario = new Usuario();
            user.nombre = result.user.displayName !== null ? result.user.displayName : '';
            user.email = result.user.email !== null ? result.user.email : '';
            this.logearUser(user);
          }
        });
    } catch (error) {
      console.log('ERROR en Autenticacion con google: ', error);
    }
  }

  async registrar(usuario: Usuario) {
    try {
      return await this.afAuth.createUserWithEmailAndPassword(usuario.email, usuario.password).then(result => {
        this.logearUser(usuario);
      });
    }
    catch (error) {
      console.log('ERROR en registrar user: ', error);
      return error;
    }
  }

}
