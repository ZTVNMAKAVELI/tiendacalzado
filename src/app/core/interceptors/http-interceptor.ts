import { inject } from '@angular/core';
import { HttpEvent, HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

export const HttpRequestInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  console.log('--- Interceptor activado para la URL:', req.url); // LOG 1

  const storageService = inject(StorageService);

  if (storageService.isLoggedIn()) {
    console.log('--- Usuario está logueado, buscando token...'); // LOG 2
    const user = storageService.getUser();
    const token = user.token;

    if (token) {
      console.log('--- Token encontrado. Adjuntando encabezado...'); // LOG 3
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
      return next(authReq);
    } else {
      console.log('--- ERROR: Usuario logueado pero no se encontró token.'); // LOG 4
    }
  } else {
    console.log('--- ADVERTENCIA: Usuario no está logueado. Petición sin token.'); // LOG 5
  }

  return next(req);
};