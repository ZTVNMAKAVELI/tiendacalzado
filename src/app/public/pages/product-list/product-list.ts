import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService, Producto } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { LoaderComponent } from '../../../shared/components/loader/loader';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './product-list.html',
  styleUrls: ['./product-list.scss']
})
export class ProductListComponent implements OnInit {

  products: Producto[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

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
        this.error = 'No se pudieron cargar los productos en este momento. Por favor, intente recargar la pagina.';
        this.isLoading = false;
      }
    });
  }

  onAddToCart(product: Producto): void {
    if (product.stock > 0) {
      this.cartService.addToCart(product, 1);
      
      console.log(`${product.nombre} agregado al carrito`);
    } else {
      console.warn(`No se puede agregar ${product.nombre} al carrito`);
    }
  }
}