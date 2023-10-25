import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = "";
  password="";

  constructor(private userService : UserService){ 
  }
  
  ngOnInit(): void {
    
  }

  private Limpiar() {
    this.email="";
    this.password="";
  }

  async Ingresar() {
    let usuario = {
      email:this.email,
      password:this.password
    };

    const exito = await this.userService.ingresarUsuario(usuario);
    this.Limpiar();

    if(exito){
      this.userService.notificarUsuarioLogueado();
    }
  }

  cargarDatosAdmin(){
    this.email="admin@admin.com";
    this.password="admin123";
  }

  cargarDatosUsuario(){
    this.email="usuario@gmail.com";
    this.password="usuario123";
  }

  cargarDatosInvitado(){
    this.email="invitado@gmail.com";
    this.password="invitado123";
  }

}
