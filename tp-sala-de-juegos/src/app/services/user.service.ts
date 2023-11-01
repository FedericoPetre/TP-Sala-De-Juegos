import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fireAuth : AngularFireAuth, private fireBase : AngularFirestore, private router : Router, private notificacion : NotifyService) {
    this.usuarioLogueado = new Subject<void>();
  }
  
  email : string = "";
  nombre : string = "";
  usuarioLogueado;
  flagLogueado : boolean = false;

   registrarUsuario(user :any) : Promise<boolean> {
    return new Promise<boolean>((resolve) =>{
      this.fireAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(dataUser => {
        //crea el usuario y lo guarda en la base de datos
        const uId = dataUser.user?.uid;
        const documento = this.fireBase.doc("Usuarios/"+uId);
        documento.set({
          uId:uId,
          nombre:user.nombre,
          email:user.email
        });
        resolve(this.ingresarUsuario({email:user.email, password:user.password}));
        
      }).catch(error=>{
        let tipoError = error.code;
        let mensaje = "Error! ";
  
        switch(tipoError){
          case "auth/invalid-email":
            mensaje += "Correo no válido";
            break;
          case "auth/user-disabled":
            mensaje+= "Cuenta deshabilitada";
            break;
          case "auth/user-not-found":
            mensaje+="El usuario no existe";
            break;
          case "auth/wrong-password":
            mensaje+="Contraseña incorrecta";
            break;
          case "auth/weak-password":
            mensaje+="La contraseña debe tener al menos 6 caracteres";
            break;
          case "auth/email-already-in-use":
            mensaje+="Ya existe un usuario con ese mail registrado";
            break;
        }
        resolve(false);
        console.log(mensaje);
        Swal.fire("",mensaje,"error");  
      });
    });
  }

  ingresarUsuario({email, password}: any): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      this.email = email;
      this.fireAuth.signInWithEmailAndPassword(email, password).then(response => {
        this.flagLogueado = true;
        const uIdLogin = response.user?.uid;
        const fechaActual = new Date();
        const documento = this.fireBase.doc("Logs/"+uIdLogin);
        documento.set({
          uId:uIdLogin,
          email:email,
          fecha:fechaActual,
        });
        Swal.fire("", "Has ingresado exitosamente", "success");
        resolve(true); // Éxito: resolvemos la promesa con true
        this.router.navigate(['/home']);
      }).catch(error => {
        let tipoError = error.code;
        let mensaje = "Error! ";
  
        switch (tipoError) {
          case "auth/invalid-email":
            mensaje += "Correo no válido";
            break;
          case "auth/user-disabled":
            mensaje += "Cuenta deshabilitada";
            break;
          case "auth/user-not-found":
            mensaje += "El usuario no existe";
            break;
          case "auth/wrong-password":
            mensaje += "Contraseña incorrecta";
            break;
        }
        console.log(mensaje);
        Swal.fire("", mensaje, "error");
        resolve(false); // Error: resolvemos la promesa con false
      });
    });
  }

  recuperarDatosUsuario() {

    let dataUsuario = this.fireBase.collection("Usuarios",(ref)=>ref.where("email","==",this.email));

    return dataUsuario.valueChanges();
  }

  notificarUsuarioLogueado(){
    this.usuarioLogueado.next();
  }

  salir() {
    this.flagLogueado = false;
    return this.fireAuth.signOut();
  }

  GuardarMensaje(mensaje: string, nombre : string)
  {   
    const fechaActual = new Date(); // Obtiene la fecha y hora actual con moment.js
  
    const objetoJSData = {
      email: this.email,
      nombre: nombre,
      mensaje: mensaje,
      fecha: fechaActual 
    };
  
    return this.fireBase.collection("historial").add(objetoJSData);
  }

  TraerHistorial() {
    const coleccion = this.fireBase.collection('historial' , ref =>
      ref.orderBy("fecha", "asc")
    );
    return coleccion.valueChanges();
  }

  /**
   * Para guardar el registro que logró el jugador al finalizar cada juego
   * @param puntaje Puntaje que consiguió el jugador
   * @param intentos Intentos 
   * @param numeroJuego mayor-menor: 0, ahorcado : 1, preguntados: 2, juego-propio : 3
   */
  guardarRegistrosJuego(puntaje : number, intentos : number, numeroJuego : number){
    let fechaCompleta = new Date();

    const registroJuego = {
      nombre: this.nombre,
      email: this.email,
      fecha: fechaCompleta,
      puntaje: puntaje,
      intentos:intentos
    };

    let coleccion : string = "";
    let juego : string = "";

    switch(numeroJuego){
      case 0:
        coleccion = "mayor-menor";
        juego = coleccion;
        break;
      case 1:
        coleccion = "ahorcado";
        juego = coleccion;
        break;
      case 2:
        coleccion = "preguntados";
        juego = coleccion;
        break;
      case 3:
        coleccion="encuentra-el-tesoro";
        juego = coleccion;
        break;
    }

    this.fireBase.collection(coleccion).add(registroJuego).then((doc)=>{
      console.log("registro agregado a la colección "+coleccion+" con documento: "+doc.id);
      this.notificacion.showInfo("Se ha guardado el puntaje del juego "+juego+" en la base de datos","");
    }).catch((error:any)=>{
      console.log(error);
    });
  }

  traerRegistrosJuego(nombreJuego : string){
    const registros = this.fireBase.collection(nombreJuego , ref =>
    ref.orderBy("fecha", "asc")
  );
  return registros.valueChanges();
  }


  guardarEncuesta({nombre, apellido, edad, telefono, loMasDificilDeLaApp, juegoQueMasGusto, juegoAgregarOMejorar, calificacionApp}:any)
  {   
    const respuesta = {
      nombre:nombre,
      apellido:apellido,
      edad:edad,
      telefono:telefono,
      loMasDificilDeLaApp:loMasDificilDeLaApp,
      juegoQueMasGusto:juegoQueMasGusto,
      juegoAgregarOMejorar:juegoAgregarOMejorar,
      calificacionApp:calificacionApp
    };
  
    this.fireBase.collection("respuestasEncuesta").add(respuesta).then((doc)=>{
      this.notificacion.showSuccess("Se ha registrado tu respuesta","Encuesta Respondida");
    }).catch((error:any)=>{
      console.log(error);
    });;
  }

  traerResultadosEncuesta(){
    const resultadosEncuesta = this.fireBase.collection("respuestasEncuesta");
    return resultadosEncuesta.valueChanges();
  }
}
