import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JuegosComponent } from './juegos.component';
import { AhorcadoComponent } from 'src/app/components/juegos/ahorcado/ahorcado.component';
import { MayorMenorComponent } from 'src/app/components/juegos/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from 'src/app/components/juegos/preguntados/preguntados.component';
import { ResultadosJuegosComponent } from 'src/app/components/resultados-juegos/resultados-juegos.component';
import { EncuentraElTesoroComponent } from 'src/app/components/juegos/encuentra-el-tesoro/encuentra-el-tesoro.component';

const routes: Routes = [{ path: '', component: JuegosComponent, children:
[{path:'ahorcado',component:AhorcadoComponent,title:"Ahorcado Sala de Juegos"},
{path:'mayor-menor',component:MayorMenorComponent,title:"Mayor-Menor Sala de Juegos"},
{path:'preguntados',component:PreguntadosComponent,title:"Preguntados Sala de Juegos"},
{path:'encuentra-el-tesoro',component:EncuentraElTesoroComponent,title:"Encuentra El Tesoro Sala de Juegos"},
{path:'records',component:ResultadosJuegosComponent,title:"Listado Resultados Sala de Juegos"}] 
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
