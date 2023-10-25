import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-encuentra-el-tesoro',
  templateUrl: './encuentra-el-tesoro.component.html',
  styleUrls: ['./encuentra-el-tesoro.component.scss']
})
export class EncuentraElTesoroComponent {

  ngOnInit(){
    this.desordenarArray();
  }

  flagTerminoElJuego : boolean = false;

  arrayTesoro : any = [
    {foto:"../../../../assets/img/encuentra-el-tesoro/barco-pirata.png", id:0},
    {foto:"../../../../assets/img/encuentra-el-tesoro/barco-pirata.png", id:1},
    {foto:"../../../../assets/img/encuentra-el-tesoro/mapa-del-tesoro.png", id:2},
    {foto:"../../../../assets/img/encuentra-el-tesoro/barco-pirata.png", id:3},
    {foto:"../../../../assets/img/encuentra-el-tesoro/calavera.png", id:4},
    {foto:"../../../../assets/img/encuentra-el-tesoro/barco-pirata.png", id:5},
    {foto:"../../../../assets/img/encuentra-el-tesoro/barco-pirata.png", id:6},
    {foto:"../../../../assets/img/encuentra-el-tesoro/barco-pirata.png", id:7},
    {foto:"../../../../assets/img/encuentra-el-tesoro/mapa-del-tesoro.png", id:8},
    {foto:"../../../../assets/img/encuentra-el-tesoro/tesoro.png", id:9}
  ];

  //inicializacion de variables
  puntaje = 0;
  intentos = 0;

  tarjeta1:any;
  tarjetaInicial:any;
  primerResultado : number = -1;
  dorsoFoto : string = "../../../../assets/img/encuentra-el-tesoro/brujula.png";
  botones : any = [];
  cantidadTarjetasDestapadas = 0;

  constructor(private firebase : UserService){

  }

  desordenarArray(){
    this.arrayTesoro.sort(()=>Math.random()-0.5);
  }

  volverAJugar(){
    this.flagTerminoElJuego = !this.flagTerminoElJuego;
    this.cantidadTarjetasDestapadas = 0;
    this.puntaje = 0;
    this.intentos = 0;

    this.botones.forEach((boton:any)=>{
      boton.disabled = false;
      boton.innerHTML = '<img style="width:175px; height:175px;" src="'+this.dorsoFoto+'"/>';
    });

    this.desordenarArray();
    this.desordenarArray();
  }

  
  destapar(idBoton : number | undefined)
  {
    if(idBoton != undefined)
    {
        let id : number = idBoton;

        this.cantidadTarjetasDestapadas++;
        this.tarjeta1 = document.getElementById(idBoton+"");
        this.botones.push(this.tarjeta1);
        this.tarjeta1.innerHTML = '<img style="width:175px; height:175px;" src="'+this.encontrarFoto(id)+'"/>';
        this.tarjeta1.disabled = true;

        if(this.cantidadTarjetasDestapadas < 10){
          this.intentos++;         
          if(this.determinarSiElIdEsDelMapa(id)){
            this.puntaje = this.puntaje + 2;
          }else if(this.determinarSiElIdEsDelTesoro(id)){
            this.puntaje = this.puntaje + 10;
            this.flagTerminoElJuego = true;
            this.deshabilitarTodosLosBotones();
          }else if(this.determinarSiEsLaCalavera(id)){
            this.flagTerminoElJuego = true;
            this.deshabilitarTodosLosBotones();            
          }else{
            this.puntaje++;
          }
        }

        if(this.flagTerminoElJuego){
          this.guardarResultadosEnFirebase();
        }

        this.limpiarTarjeta();
    }

  }

  encontrarFoto(id : number){
    let pathFoto : string = "";
    this.arrayTesoro.forEach((item:any)=>{
      if(item.id == id){
        pathFoto = item.foto;
      }
    });
    return pathFoto;
  }

  determinarSiElIdEsDelTesoro(id:number){
    return id == 9;
  }

  determinarSiElIdEsDelMapa(id:number){
    return id == 8  || id == 2;
  }

  determinarSiEsLaCalavera(id:number){
    return id == 4;
  }

  limpiarTarjeta(){
    this.tarjeta1 = null;
  }

  deshabilitarTodosLosBotones(){
    this.arrayTesoro.forEach((item:any)=>{
      this.tarjeta1 = document.getElementById(item.id+"");
      this.botones.push(this.tarjeta1);
      this.tarjeta1.disabled = true;
      this.tarjeta1 = null;
    });
  }

  guardarResultadosEnFirebase(){
    this.firebase.guardarRegistrosJuego(this.puntaje, this.intentos, 3);
  }

}
