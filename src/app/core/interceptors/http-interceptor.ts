import { inject } from '@angular/core';
import { HttpEvent, HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

export const HttpRequestInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  // Usamos inject() para obtener la instancia del servicio correctamente
  const storageService = inject(StorageService);
  let clonedRequest = req;

  if (storageService.isLoggedIn()) {
    const user = storageService.getUser();
    const token = user.token;
    if (token) {
      clonedRequest = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    }
  }
  return next(clonedRequest);
};