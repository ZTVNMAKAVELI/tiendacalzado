import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Producto } from '../../../core/services/product.service';
import { LoaderComponent } from '../../../shared/components/loader/loader'; // Importa el loader
import { RouterLink } from '@angular/router'; // Importa RouterLink

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent], // Añade RouterLink y LoaderComponent
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit {
  // El resto de la lógica del componente se mantiene igual
  products: Producto[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.error = null;
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar los productos:', err);
        this.error = 'No se pudieron cargar los productos. Por favor, intente más tarde.';
        this.isLoading = false;
      }
    });
  }
}