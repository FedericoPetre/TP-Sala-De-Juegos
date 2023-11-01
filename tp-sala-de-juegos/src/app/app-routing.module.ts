import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { PreguntadosComponent } from './components/juegos/preguntados/preguntados.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ResultadosEncuestaComponent } from './components/resultados-encuesta/resultados-encuesta.component';
import { adminGuard } from './guards/admin-guard.guard';

const routes: Routes = [
  {path:"login",title:"Iniciar sesión Sala de Juegos",component:LoginComponent},
  {path:"quien-soy",title:"¿quién soy? Sala de Juegos",component:QuienSoyComponent},
  {path:"registrarse",title:"Registrarse Sala de Juegos",component:RegisterComponent},
  {path:"home",title:"Home Sala de Juegos",component:HomeComponent},
  {path:"chat",title:"Chat Sala de Juegos", component:ChatComponent},
  {path:"",title:"Home Sala de Juegos",component:HomeComponent},
  {path:"encuesta",title:"Encuesta Sala de Juegos",component:EncuestaComponent},
  {path:"resultadosEncuesta",title:"Resultados Encuesta Sala de Juegos",component:ResultadosEncuestaComponent, canActivate:[adminGuard]},
  { path: 'juegos', loadChildren: () => import('./modulos/juegos/juegos.module').then(m => m.JuegosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
