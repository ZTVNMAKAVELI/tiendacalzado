import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  // Propiedad para saber si estamos en el navegador
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Verificamos la plataforma al construir el servicio
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  clean(): void {
    // Solo interactuamos con localStorage si estamos en un navegador
    if (this.isBrowser) {
      window.localStorage.clear();
    }
  }

  public saveUser(user: any): void {
    if (this.isBrowser) {
      window.localStorage.removeItem(USER_KEY);
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  public getUser(): any {
    if (this.isBrowser) {
      const user = window.localStorage.getItem(USER_KEY);
      if (user) {
        return JSON.parse(user);
      }
    }
    // Si no estamos en el navegador, devolvemos un objeto vacío
    return {};
  }

  public isLoggedIn(): boolean {
    if (this.isBrowser) {
      const user = window.localStorage.getItem(USER_KEY);
      return !!user;
    }
    // Si no estamos en el navegador, el usuario no puede estar logueado
    return false;
  }
}