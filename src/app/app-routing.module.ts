import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardianAutentificadorGuard } from './guard/guardian-autentificador.guard';
import { AdivinarPalabraComponent } from './pages/adivinar-palabra/adivinar-palabra.component';
import { AhorcadoComponent } from './pages/ahorcado/ahorcado.component';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MayorMenorComponent } from './pages/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './pages/preguntados/preguntados.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'quienSoy', component: QuienSoyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'mayorMenor', component: MayorMenorComponent, canActivate: [GuardianAutentificadorGuard]},
  {path: 'preguntados', component: PreguntadosComponent, canActivate: [GuardianAutentificadorGuard]},
  {path: 'ahorcado', component: AhorcadoComponent, canActivate: [GuardianAutentificadorGuard]},
  {path: 'adivinarPalabra', component: AdivinarPalabraComponent, canActivate: [GuardianAutentificadorGuard]},
  {path: 'encuesta', component: EncuestaComponent, canActivate: [GuardianAutentificadorGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},//Si esta vacio voy a home
  {path: '**', redirectTo: 'home'}//Si es cualquier cosa, voy a home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
