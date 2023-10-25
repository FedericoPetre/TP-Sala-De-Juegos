import { Component } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resultados-juegos',
  templateUrl: './resultados-juegos.component.html',
  styleUrls: ['./resultados-juegos.component.scss']
})
export class ResultadosJuegosComponent {
  constructor(private firebase : UserService, private notificacion : NotifyService){}

  juegoTxt: string="";
  nombreJuego: string="";
  resultados: any =[];
  seBuscoJuego: boolean= false;
  obser$: any;

  ngOnInit() {
    
  }

  ngOnDestroy() {
    if (this.obser$) 
    {
      this.obser$.unsubscribe();
    }
  }

  elegirJuego(juego: string)
  {
    switch(juego){
      case "ahorcado":
        this.nombreJuego = "Ahorcado";
        break;
      case "mayor-menor":
        this.nombreJuego = "Mayor o Menor";
        break;
      case "preguntados":
        this.nombreJuego = "Preguntados";
        break;
      case "encuentra-el-tesoro":
        this.nombreJuego = "Encuentra el Tesoro";
        break;
    }

    this.obser$ = this.firebase.traerRegistrosJuego(juego).subscribe(datos =>{
      this.agregarHistorial(datos);
      this.seBuscoJuego = true;
    });
  }

  agregarHistorial(arrayAux: Array<any>)
  {
    let arrayNuevo =[];

    for (let i = 0; i < arrayAux.length; i++) 
    {
      let seconds = arrayAux[i].fecha.seconds;
      let nanoseconds = arrayAux[i].fecha.nanoseconds;

      // Crear un objeto Date usando los segundos (multiplicados por 1000 para convertirlos a milisegundos) y los nanosegundos (divididos por 1,000,000 para convertirlos a milisegundos)
      const fecha = new Date(seconds * 1000 + nanoseconds / 1000000);

      // Obtener los componentes de la fecha
      const anio = fecha.getFullYear();
      const mes = fecha.getMonth() + 1; // Los meses en JavaScript son de 0 a 11
      const dia = fecha.getDate();
      const horas = fecha.getHours();
      const minutos = fecha.getMinutes();
      const segundos = fecha.getSeconds();
      // Formatear la fecha y hora según tu preferencia
      const fechaFormateada = `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}  ${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

      let objJson = {
        nombre: arrayAux[i].nombre,
        email: arrayAux[i].email,
        fecha: fechaFormateada,
        puntaje:arrayAux[i].puntaje,
        intentos:arrayAux[i].intentos
      };

      arrayNuevo.push(objJson);
    }

    this.resultados=arrayNuevo;
  }


}
