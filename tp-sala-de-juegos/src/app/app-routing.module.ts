import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { PreguntadosComponent } from './components/juegos/preguntados/preguntados.component';

const routes: Routes = [
  {path:"login",title:"Iniciar sesión Sala de Juegos",component:LoginComponent},
  {path:"quien-soy",title:"¿quién soy? Sala de Juegos",component:QuienSoyComponent},
  {path:"registrarse",title:"Registrarse Sala de Juegos",component:RegisterComponent},
  {path:"home",title:"Home Sala de Juegos",component:HomeComponent},
  {path:"chat",title:"Chat Sala de Juegos", component:ChatComponent},
  {path:"",title:"Home Sala de Juegos",component:HomeComponent},
  { path: 'juegos', loadChildren: () => import('./modulos/juegos/juegos.module').then(m => m.JuegosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
