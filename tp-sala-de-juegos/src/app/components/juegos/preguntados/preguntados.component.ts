import { AfterViewInit, Component } from '@angular/core';
import { PeticionHTTPService } from 'src/app/services/peticion-http.service';
import { ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent {

  intentos : number;
  puntaje : number;
  puntajeFinal : number;

  constructor(private peticion: PeticionHTTPService, private cdr: ChangeDetectorRef, private firebase : UserService){
    this.intentos = 10;
    this.puntaje = 0;
    this.puntajeFinal = 0;
  }
  flagEmpezoElJuego : boolean = true;
  flagGameOver : boolean = false;

  async ngOnInit(){
    this.informacion = await this.peticion.getPersonajes();
    let personajesFiltrados : any[] = [];

    this.personajesHarryPotterArrayMapeados = await this.informacion.map((personaje:any)=>{
      let objPersonaje = {
        nombre: personaje.name,
        imagen : personaje.image,
        especie : personaje.species
      };
      return objPersonaje;
    });

    this.personajesHarryPotterArrayMapeados.forEach((personaje : any)=>{
      if(personaje.imagen != ""){
        personajesFiltrados.push(personaje);
      }
    });

    this.personajesHarryPotterArrayFiltrados = personajesFiltrados;
    
    console.log(this.personajesHarryPotterArrayFiltrados);
    this.base_preguntas = this.leerTexto("../../../../assets/text/preguntas.json");
    this.interprete_preguntas = JSON.parse(this.base_preguntas);
    this.botones = [this.estilo("btn0"), this.estilo("btn1"), this.estilo("btn2"), this.estilo("btn3")];
    this.elegirPreguntaAleatoria();
  }

  informacion : any;
  personajesHarryPotterArrayMapeados = [];
  personajesHarryPotterArrayFiltrados: any[] = [];
  base_preguntas : any;
  interprete_preguntas : any;
  obj_pregunta : any;
  botones: any;
  arrayRespuestas : any;

  personajeMostrado : any;


  categoria = "";
  pregunta = "";
  srcImagen = "";

  seleccionarId(id: string){
    return document.getElementById(id);
  }

  estilo(id : string){
    return this.seleccionarId(id)?.style;
  }

  leerTexto(rutaLocal : string){
    let texto = "";
    let xhttp = new XMLHttpRequest();
    xhttp.open("GET",rutaLocal, false);
    xhttp.send();

    if(xhttp.status == 200 && xhttp.readyState == 4){
      texto = xhttp.responseText;
    }
    return texto;
  }

  elegirPregunta(index : number){
    this.obj_pregunta = this.interprete_preguntas[index];

    this.categoria = this.obj_pregunta.categoria;
    this.pregunta = this.obj_pregunta.pregunta;
    this.srcImagen = this.obj_pregunta.imagen;

    this.desordenarRespuestas();
  }

  desordenarRespuestas(){
    this.arrayRespuestas = [this.obj_pregunta.respuesta, this.obj_pregunta.incorrecta1, this.obj_pregunta.incorrecta2, this.obj_pregunta.incorrecta3];
    this.arrayRespuestas.sort(()=>Math.random()-0.5);

    let btn1 =  this.seleccionarId("btn1");
    let btn2 =  this.seleccionarId("btn2");
    let btn3 =  this.seleccionarId("btn3");
    let btn4 =  this.seleccionarId("btn4");

    if(btn1 != null){
      btn1.innerHTML = this.arrayRespuestas[0];
    }

    if(btn2 != null){
      btn2.innerHTML = this.arrayRespuestas[1];
    }

    if(btn3 != null){
      btn3.innerHTML = this.arrayRespuestas[2];
    }

    if(btn4 != null){
      btn4.innerHTML = this.arrayRespuestas[3];
    }
  }


  elegirPreguntaAleatoria(){
    this.elegirPregunta(Math.floor(Math.random()*this.interprete_preguntas.length))
  }

  apretarBoton(idBoton : number){
    console.log(JSON.stringify(this.botones[idBoton]));
    
    if(this.arrayRespuestas[idBoton] == this.obj_pregunta.respuesta){
      this.botones[idBoton].style.background = 'green';
    }
    else{
      this.botones[idBoton].style.background = 'red';
    }
    setTimeout(() => {
      this.reiniciarBotones();
    }, 3000);
  }

  reiniciarBotones(){
    for(const btn of this.botones){
      btn.style.background = "white";
    }

    this.elegirPreguntaAleatoria();
  }

  compararSonIguales(objElegidoNumero : any){
    let retorno : boolean = false;
    let estilo:any;

    if(this.listaPreguntas[objElegidoNumero].nombre == this.personajeMostrado.nombre){
      retorno = true;
      console.log("Acertó");
      this.puntaje++;
      //se suma el punto, aumentan los intentos, cambia la pregunta, se pone el botón verde
      estilo = this.estilo(`btn${objElegidoNumero}`);
      if(estilo != undefined && estilo != null){
        estilo.background = 'green';
      }
    }
    else
    {
      console.log("Falló");
      //aumentan los intentos, cambia la pregunta, se pone el botón rojo
     estilo = this.estilo(`btn${objElegidoNumero}`);
     if(estilo != undefined && estilo != null){
      estilo.background = 'red';
     }
    }
    
    if(this.intentos > 1){
      this.intentos--;
      setTimeout(()=>{
        estilo.background='white';
        this.generarPregunta();
      },1500);

    }else{ //si ya se acabaron los 10 intentos, se acaba el juego se reinicia todos los contadores de intentos y puntaje
      this.flagEmpezoElJuego = true; // para que no se muestren las preguntas
      this.flagGameOver = true;
      this.puntajeFinal = this.puntaje;
      this.puntaje = 0;
      this.intentos = 10;
      this.firebase.guardarRegistrosJuego(this.puntajeFinal, 10, 2);

    }

    return retorno;
  }


  listaPreguntas : any;

  generarPregunta(){
    this.puntajeFinal = 0;
    this.personajesHarryPotterArrayFiltrados.sort(()=>Math.random()-0.5);
    
    this.listaPreguntas = this.personajesHarryPotterArrayFiltrados.slice(0,4);
    this.personajeMostrado = this.listaPreguntas[2];

    this.listaPreguntas.sort(()=>Math.random()-0.5);
    this.cdr.detectChanges();

    this.flagEmpezoElJuego = false;

  }

}
