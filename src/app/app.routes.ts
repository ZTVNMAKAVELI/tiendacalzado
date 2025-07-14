import { Routes } from '@angular/router';

import { ProductListComponent } from './public/pages/product-list/product-list';
import { NosotrosComponent } from './public/pages/nosotros/nosotros';
import { ContactoComponent } from './public/pages/contacto/contacto';
import { ProductDetailComponent } from './public/pages/product-detail/product-detail'; 
import { CartComponent } from './public/pages/cart/cart';
import { LoginComponent } from './auth/pages/login/login';
import { RegisterComponent } from './auth/pages/register/register';
import { authGuard } from './core/guards/auth-guard';
import { CheckoutComponent } from './public/pages/checkout/checkout';
import { adminGuard } from './core/guards/admin-guard'; // Importa el admin guard
import { AdminProductListComponent } from './admin/pages/product-list/product-list';
import { AdminProductFormComponent } from './admin/pages/product-form/product-form';
export const routes: Routes = [
   

    { path: '', component: ProductListComponent }, // Página de inicio
    { path: 'catalogo', component: ProductListComponent },
    { path: 'nosotros', component: NosotrosComponent }, 
    { path: 'contacto', component: ContactoComponent }, 
    { path: 'producto/:id', component: ProductDetailComponent },
    { path: 'carrito', component: CartComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegisterComponent },
    { 
      path: 'checkout', 
      component: CheckoutComponent,
      canActivate: [authGuard]
    },
      { 
    path: 'admin/productos', 
    component: AdminProductListComponent, 
    canActivate: [adminGuard] 
  },
  { 
    path: 'admin/productos/nuevo', 
    component: AdminProductFormComponent, 
    canActivate: [adminGuard] 
  },
  { 
    path: 'admin/productos/editar/:id', 
    component: AdminProductFormComponent, 
    canActivate: [adminGuard] 
  },
    { path: '**', redirectTo: '' }
];