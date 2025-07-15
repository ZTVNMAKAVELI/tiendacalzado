import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const storageService = inject(StorageService);
  const router = inject(Router);
  
  if (storageService.isLoggedIn()) {
    const user = storageService.getUser();
    // Verificamos si el array de roles incluye 'ROLE_ADMIN'
    if (user.roles && user.roles.includes('ROLE_ADMIN')) {
      return true; // Permite el acceso
    }
  }

  // Si no es admin, redirige al catálogo.
  router.navigate(['/catalogo']);
  return false;
};