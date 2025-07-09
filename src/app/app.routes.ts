import { Routes } from '@angular/router';

import { ProductListComponent } from './public/pages/product-list/product-list';
import { NosotrosComponent } from './public/pages/nosotros/nosotros';
import { ContactoComponent } from './public/pages/contacto/contacto';
import { ProductDetailComponent } from './public/pages/product-detail/product-detail'; 
import { CartComponent } from './public/pages/cart/cart';
export const routes: Routes = [
   

    { path: '', component: ProductListComponent }, // Página de inicio
    { path: 'catalogo', component: ProductListComponent },
    { path: 'nosotros', component: NosotrosComponent }, 
    { path: 'contacto', component: ContactoComponent }, 
    { path: 'producto/:id', component: ProductDetailComponent },
    { path: 'carrito', component: CartComponent }, 
    { path: '**', redirectTo: '' }
];