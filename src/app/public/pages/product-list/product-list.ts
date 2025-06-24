import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Definimos una interfaz para el tipado fuerte de nuestros datos. ¡Es una buena práctica!
export interface Product {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  imagenUrl: string;
}

@Component({
  selector: 'app-product-list',
    standalone: true,
  imports: [CommonModule], 
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit {

  // Creamos la propiedad 'products' que usaremos en el HTML con *ngFor
  products: Product[] = []; 

  constructor() { }

  ngOnInit(): void {
    // Aquí es donde, en el futuro, llamarás a tu ProductService.
    // Por ahora, cargamos los datos de muestra directamente.
    this.loadMockProducts();
  }

  loadMockProducts(): void {
    this.products = [
      {
          id: 1,
          nombre: 'Zapatillas Urban Runner',
          categoria: 'Deportivo',
          precio: 189.90,
          imagenUrl: 'https://placehold.co/400x400/3498db/ffffff?text=Urbano'
      },
      {
          id: 2,
          nombre: 'Botines de Cuero "Elegance"',
          categoria: 'Formal',
          precio: 320.00,
          imagenUrl: 'https://placehold.co/400x400/2c3e50/ffffff?text=Elegance'
      },
      {
          id: 3,
          nombre: 'Sandalias de Verano "Sol"',
          categoria: 'Casual',
          precio: 79.50,
          imagenUrl: 'https://placehold.co/400x400/f1c40f/ffffff?text=Sol'
      },
      {
          id: 4,
          nombre: 'Zapatos de Trekking',
          categoria: 'Outdoor',
          precio: 250.00,
          imagenUrl: 'https://placehold.co/400x400/27ae60/ffffff?text=Aventura'
      },
      {
          id: 5,
          nombre: 'Mocasines Clásicos',
          categoria: 'Formal',
          precio: 210.00,
          imagenUrl: 'https://placehold.co/400x400/8e44ad/ffffff?text=Clasico'
      },
      {
          id: 6,
          nombre: 'Zapatillas de Lona "Retro"',
          categoria: 'Urbano',
          precio: 150.00,
          imagenUrl: 'https://placehold.co/400x400/e74c3c/ffffff?text=Retro'
      },
      {
          id: 7,
          nombre: 'Botas de Trabajo "Fortaleza"',
          categoria: 'Seguridad',
          precio: 280.00,
          imagenUrl: 'https://placehold.co/400x400/95a5a6/ffffff?text=Fortaleza'
      },
      {
          id: 8,
          nombre: 'Pantuflas "Comodidad"',
          categoria: 'Hogar',
          precio: 65.00,
          imagenUrl: 'https://placehold.co/400x400/1abc9c/ffffff?text=Hogar'
      }
    ];
  }
}