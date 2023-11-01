import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
import { ToastrModule } from 'ngx-toastr'; // Importa ToastrModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { AngularFireModule } from '@angular/fire/compat';
import { ChatComponent } from './components/chat/chat.component';
import { AhorcadoComponent } from './components/juegos/ahorcado/ahorcado.component';
import { MayorMenorComponent } from './components/juegos/mayor-menor/mayor-menor.component';
import { PreguntadosComponent } from './components/juegos/preguntados/preguntados.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultadosJuegosComponent } from './components/resultados-juegos/resultados-juegos.component';
import { EncuentraElTesoroComponent } from './components/juegos/encuentra-el-tesoro/encuentra-el-tesoro.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { ResultadosEncuestaComponent } from './components/resultados-encuesta/resultados-encuesta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    QuienSoyComponent,
    NavbarComponent,
    RegisterComponent,
    ChatComponent,
    AhorcadoComponent,
    MayorMenorComponent,
    PreguntadosComponent,
    ResultadosJuegosComponent,
    EncuentraElTesoroComponent,
    EncuestaComponent,
    ResultadosEncuestaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    BrowserAnimationsModule, // Agrega BrowserAnimationsModule a los imports
    ToastrModule.forRoot(), // Configura ToastrModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
