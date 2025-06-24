import { Routes } from '@angular/router';

import { ProductListComponent } from './public/pages/product-list/product-list';

export const routes: Routes = [
    {
        // Cuando la URL sea la raíz (ej: http://localhost:4200)
        path: '', 
        // Carga el componente de la lista de productos
        component: ProductListComponent 
    },
    // Es una buena práctica añadir una ruta "comodín" para redirigir
    // cualquier URL no encontrada a la página principal.
    {
        path: '**',
        redirectTo: ''
    }
];