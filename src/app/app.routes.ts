import { Routes } from '@angular/router';

import { ProductListComponent } from './public/pages/product-list/product-list';
import { NosotrosComponent } from './public/pages/nosotros/nosotros';
import { ContactoComponent } from './public/pages/contacto/contacto';
import { ProductDetailComponent } from './public/pages/product-detail/product-detail'; 

export const routes: Routes = [
   

    { path: '', component: ProductListComponent }, // Página de inicio
    { path: 'catalogo', component: ProductListComponent }, // Ruta explícita
    { path: 'nosotros', component: NosotrosComponent }, // Nueva ruta
    { path: 'contacto', component: ContactoComponent }, // Nueva ruta
    { path: 'producto/:id', component: ProductDetailComponent },
    { path: '**', redirectTo: '' }
];