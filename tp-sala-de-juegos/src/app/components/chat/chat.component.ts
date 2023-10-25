import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {

  chatA: boolean = false;
  chatB: boolean = false;
  mensajeNuevo: string ="";
  historialSeleccionado:string ="";
  obser$: any;
  arrayMensajes: any;
  personaLog: boolean = true;

  constructor(public firebase: UserService) { }

  ngOnInit() {
    this.obser$ = this.firebase.TraerHistorial().subscribe(datos =>{
      this.AgregarHistorial(datos);
    });
  }

  ngOnDestroy() {
    if (this.obser$) 
    {
      this.obser$.unsubscribe();
    }
  }

  async EnviarMensaje()
  {
    if(this.mensajeNuevo!="")
    {
      this.firebase.GuardarMensaje(this.mensajeNuevo, this.firebase.nombre);
      this.mensajeNuevo="";
    }
    else
    {
    // this.notificaciones.NotificarConToast("","El mensaje es muy largo, verfique que sea menor de 21 letras.", "Error");
    }
  }

  AgregarHistorial(arrayAux: Array<any>)
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
        fecha: fechaFormateada,
        nombre: arrayAux[i].nombre,
        email: arrayAux[i].email,
        mensaje: arrayAux[i].mensaje
      };

      arrayNuevo.push(objJson);
    }

    this.arrayMensajes=arrayNuevo;
  }
}
