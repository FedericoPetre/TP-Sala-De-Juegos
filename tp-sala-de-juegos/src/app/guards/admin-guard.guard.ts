import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core';
import { UserService } from '../services/user.service';

export const adminGuard: CanActivateFn = (route, state) => {
  let flagEstaLogueado : boolean = inject(UserService).flagLogueado;
  let emailUsuarioLogueado : string = inject(UserService).email;

  if(flagEstaLogueado && emailUsuarioLogueado == "admin@admin.com"){
    return true;
  }else{
    inject(Router).navigate(['home']);
    return false;
  }
};
