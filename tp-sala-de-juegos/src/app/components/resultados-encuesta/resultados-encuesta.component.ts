import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-resultados-encuesta',
  templateUrl: './resultados-encuesta.component.html',
  styleUrls: ['./resultados-encuesta.component.scss']
})
export class ResultadosEncuestaComponent {
  constructor(private firebase : UserService){

  }

  arrayRespuestas : any = [];
  obser$: any;

  ngOnInit(){
    this.traerRespuestasEncuesta();
  }

  ngOnDestroy() {
    if (this.obser$) 
    {
      this.obser$.unsubscribe();
    }
  }

  traerRespuestasEncuesta(){
    this.obser$ = this.firebase.traerResultadosEncuesta().subscribe(datos=>{
      this.agregarHistorial(datos);
    });
  }  



  agregarHistorial(arrayAux: Array<any>)
  {
    let arrayNuevo =[];

    for (let i = 0; i < arrayAux.length; i++) 
    {
      let estrellasArray = this.devolverArrayDeEstrellas(arrayAux[i].calificacionApp);

        let objJson = {
        nombre: arrayAux[i].nombre,
        apellido: arrayAux[i].apellido,
        edad: arrayAux[i].edad,
        telefono: arrayAux[i].telefono,
        loMasDificilDeLaApp: arrayAux[i].loMasDificilDeLaApp,
        juegoQueMasGusto:arrayAux[i].juegoQueMasGusto,
        juegoAgregarOMejorar:arrayAux[i].juegoAgregarOMejorar,
        estrellas: estrellasArray
      };

      arrayNuevo.push(objJson);
    }

    this.arrayRespuestas=arrayNuevo;
  }

  private devolverArrayDeEstrellas(cantidadEstrellas:number){
    let arrayEstrellas : any = [];
    for(let i =0; i<cantidadEstrellas; i++){
      arrayEstrellas.push({foto:"../../../assets/img/estrellaColoreada.png"});
    }

    return arrayEstrellas;
  }


}
