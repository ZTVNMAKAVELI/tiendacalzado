import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Producto } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../shared/components/loader/loader';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent, FormsModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Producto | null = null;
  isLoading = true;
  error: string | null = null;
  addedToCart = false;
  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.quantity = 1; 
      this.addedToCart = false;
      const productId = params.get('id');
      if (productId) {
        this.fetchProductData(+productId);
      }
    });
  }

  fetchProductData(id: number): void {
    this.isLoading = true;
    this.error = null;
    this.product = null;

    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;

        if (this.quantity > this.product.stock) {
          this.quantity = this.product.stock > 0 ? 1 : 0; 
        }
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.error = 'Producto no encontrado o error en el servidor. Por favor, verifica la URL o vuelve al catálogo.';
        this.isLoading = false;
      }
    });
  }


  incrementQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  validateQuantity(): void {
    if (this.product) {
      if (this.quantity < 1 || isNaN(this.quantity)) {
        this.quantity = 1;
      } else if (this.quantity > this.product.stock) {
        this.quantity = this.product.stock;
      }
    }
  }


  onAddToCart(): void {
    if (this.product && this.product.stock > 0) {
      this.cartService.addToCart(this.product, this.quantity);
      this.addedToCart = true;

      setTimeout(() => {
        this.addedToCart = false;
      }, 2000);
      
    } else {
      console.warn('No se pudo agregar al carrito.');
    }
  }
}
