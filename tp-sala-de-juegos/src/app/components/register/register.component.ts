import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  password = "";
  email = "";
  nombre="";
  esTexto : boolean = false;

  constructor(private userService : UserService){

  }

  private Limpiar() {
    this.password="";
    this.email="";
    this.nombre="";
  }

  async registrarse() {
    const user = {
      nombre:this.nombre,
      email:this.email,
      password:this.password
    };
   
    const exitoRegistro = await this.userService.registrarUsuario(user);
    this.Limpiar();

    if(exitoRegistro){
      this.userService.notificarUsuarioLogueado();
    }    
  }

  verContrasenia() {
    this.esTexto = !this.esTexto;
  }

}
