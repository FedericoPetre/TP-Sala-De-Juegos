import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private toastr : ToastrService) { }

  showSuccess(mensaje:string, titulo:string) {
    this.toastr.success(mensaje, titulo, {positionClass:"toast-top-right", timeOut:1000});
  }

  showError(mensaje:string, titulo:string) {
    this.toastr.error(mensaje, titulo, {positionClass:"toast-top-right", timeOut:1000});
  }

  showWarning(mensaje:string, titulo:string) {
    this.toastr.warning(mensaje, titulo, {positionClass:"toast-top-right", timeOut:1000});
  }

  showInfo(mensaje:string, titulo:string) {
    this.toastr.info(mensaje, titulo, {positionClass:"toast-top-right", timeOut:1000});
  }
}
