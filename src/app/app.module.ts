import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroComponent } from './pages/registro/registro.component';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { ChatComponent } from './components/chat/chat.component';
import { ChatService } from './services/chat.service';
import { AuthServiceService } from './services/auth-service.service';
import { MayorMenorComponent } from './pages/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './pages/preguntados/preguntados.component';
import { MarvelService } from './services/marvel.service';
import { AdivinarPalabraComponent } from './pages/adivinar-palabra/adivinar-palabra.component';
import { EncuestaService } from './services/encuesta.service';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuienSoyComponent,
    NavBarComponent,
    LoginComponent,
    RegistroComponent,
    AhorcadoComponent,
    ChatComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    AdivinarPalabraComponent,
    EncuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthServiceService,ChatService,MarvelService,EncuestaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
