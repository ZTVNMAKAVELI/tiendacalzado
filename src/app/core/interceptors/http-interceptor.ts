import { inject } from '@angular/core';
import { HttpEvent, HttpInterceptorFn, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { environment } from '../../../environments/environment';

export const HttpRequestInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
 
  const storageService = inject(StorageService);
  
  if (storageService.isLoggedIn() && req.url.startsWith(environment.apiBaseUrl)) {
    const user = storageService.getUser();
    const token = user.token;

    if (token) {

      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(authReq);
    }
  }

  return next(req);
};