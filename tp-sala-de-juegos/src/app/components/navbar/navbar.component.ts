import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
  constructor(private userService : UserService, private router : Router){}
  
  observable? : Subscription;
  datosUsuario : any;
  nombreUsuario : string = "";
  flagYaSeLogeo : boolean = false;
  
  ngAfterViewInit(): void {
    this.userService.usuarioLogueado.subscribe(()=>{
      this.observable = this.userService.recuperarDatosUsuario().subscribe(datos=>{
        this.datosUsuario = datos;
        this.nombreUsuario = this.datosUsuario[0].nombre;
        this.userService.nombre = this.nombreUsuario;
        if(this.nombreUsuario != "" && !this.flagYaSeLogeo){
          this.flagYaSeLogeo = true;
        }
      });
    });
  } 
  
  ngOnDestroy(): void {
    this.observable?.unsubscribe();
    this.userService.usuarioLogueado?.unsubscribe();
  }

  salir() {
    this.userService.salir().then(()=>{
     this.observable?.unsubscribe();
      this.flagYaSeLogeo = false;
      this.router.navigate(['login']);   
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }

}
