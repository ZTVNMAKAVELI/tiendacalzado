import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Importa RouterLink
import { ProductService, Producto } from '../../../core/services/product.service';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../../shared/components/loader/loader'; // 1. Importa el nuevo LoaderComponent

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent], // 2. Añade LoaderComponent a los imports
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetailComponent implements OnInit {
  product: Producto | null = null;
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    // 3. LA SOLUCIÓN: Nos suscribimos al observable paramMap
    this.route.paramMap.subscribe(params => {
      const productId = params.get('id');
      
      if (productId) {
        this.fetchProductData(+productId);
      }
    });
  }

  fetchProductData(id: number): void {
    this.isLoading = true; // Asegura que el loader se muestre al iniciar la carga
    this.error = null;
    this.product = null;

    this.productService.getProductById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar el producto:', err);
        this.error = 'Producto no encontrado o error en el servidor.';
        this.isLoading = false;
      }
    });
  }
}