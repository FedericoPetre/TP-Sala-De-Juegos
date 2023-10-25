import { Component, OnInit } from '@angular/core';
import { PeticionHTTPService } from 'src/app/services/peticion-http.service';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.scss']
})
export class QuienSoyComponent implements OnInit {
 
  ngOnInit() {
    this.obtenerInformacionGithub();
  }

  constructor(private peticionHttp : PeticionHTTPService)
  {

  }

  async obtenerInformacionGithub(){
    try {
      this.informacionGitHub = await this.peticionHttp.traerInformacionGithub();
      console.log(this.informacionGitHub); // Aquí puedes ver el objeto completo
      // Accede a los atributos del objeto retornado:
      this.srcImagen = this.informacionGitHub.avatar_url;
      this.informacionCompleta.nombre = this.informacionGitHub.name;
      this.informacionCompleta.bio = this.informacionGitHub.bio;
      // ...
    } catch (error) {
      // Maneja el error aquí
      console.error(error);
    }
  }

  informacionGitHub : any;
  srcImagen : string = "";
  informacionCompleta : any = {
    nombre : "",
    bio: ""
  };

}
