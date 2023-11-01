import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent {
  public form : FormGroup;
  arrayEstrellas : any = [{foto:"../../../assets/img/estrellaVacia.png",id:0},
  {foto:"../../../assets/img/estrellaVacia.png",id:1},
  {foto:"../../../assets/img/estrellaVacia.png",id:2},
  {foto:"../../../assets/img/estrellaVacia.png",id:3},
  {foto:"../../../assets/img/estrellaVacia.png",id:4}];

  public constructor(private formBuilder : FormBuilder, private firebase : UserService){
    this.form = formBuilder.group({
      nombre:['',[Validators.required, this.validarTieneEspaciosVacios,Validators.pattern('^[A-Za-záéíóúäëïöüÁÉÍÓÚÄËÏÖÜñÑ ]+$')]],
      apellido:['',[Validators.required, this.validarTieneEspaciosVacios,Validators.pattern('^[A-Za-záéíóúäëïöüÁÉÍÓÚÄËÏÖÜñÑ ]+$')]],
      edad:[0,[Validators.min(18), Validators.max(99),Validators.required, Validators.pattern('^[0-9]+$')]],
      telefono:['',[Validators.required, Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]],
      juegoQueMasGusto:['',[Validators.required]],
      loMasDificilDeLaApp:['',[Validators.required]],
      juegoAgregarOMejorar:['',[Validators.required]],
      calificacionApp:['',[Validators.required]]
    });
  }

  agregarRespuestas(){
    const respuestas = {
      nombre:this.form.get('nombre')?.value,
      apellido:this.form.get('apellido')?.value,
      edad:this.form.get('edad')?.value,
      telefono:this.form.get('telefono')?.value,
      loMasDificilDeLaApp:this.form.get('loMasDificilDeLaApp')?.value,
      juegoQueMasGusto:this.form.get('juegoQueMasGusto')?.value,
      juegoAgregarOMejorar:this.form.get('juegoAgregarOMejorar')?.value,
      calificacionApp:this.form.get('calificacionApp')?.value,
    };

    console.log(JSON.stringify(respuestas));
    this.firebase.guardarEncuesta(respuestas);
    this.limpiarTodo();
  }

  limpiarTodo(){
    this.form.setValue({
      nombre:'',
      apellido:'',
      edad:0,
      telefono:0,
      juegoQueMasGusto:'',
      loMasDificilDeLaApp:'',
      juegoAgregarOMejorar:'',
      calificacionApp:0
    });

    this.limpiarTodasLasEstrellas();
  }

  private validarTieneEspaciosVacios(control: AbstractControl): null | object {
    const espacios = (<string>control.value).includes(' ');
    return espacios?{contieneEspacios:true}:null;
  }

  colorearEstrellas(idEstrella : number){

    this.limpiarTodasLasEstrellas();

    this.arrayEstrellas.forEach((estrellaItem : any)=>{
      if(estrellaItem.id < idEstrella){
        estrellaItem.foto = "../../../assets/img/estrellaColoreada.png";
      }
    });

    this.form.get('calificacionApp')?.setValue(idEstrella);
  }

  limpiarTodasLasEstrellas(){
    this.arrayEstrellas.forEach((estrellaItem : any)=>{
      estrellaItem.foto = "../../../assets/img/estrellaVacia.png";
    });
  }
}
