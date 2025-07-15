import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);

  if (storageService.isLoggedIn()) {
    // Logeado, permitir el acceso a la ruta.
    return true;
  } else {
    // No logueado, redirige a la página de login.
    router.navigate(['/login']);
    return false;
  }
};