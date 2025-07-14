import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (storageService.isLoggedIn()) {
    // Si el usuario está logueado, permite el acceso a la ruta.
    return true;
  } else {
    // Si no está logueado, redirige a la página de login y bloquea el acceso.
    router.navigate(['/login']);
    return false;
  }
};