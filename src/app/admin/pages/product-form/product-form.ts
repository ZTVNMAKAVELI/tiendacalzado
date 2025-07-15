import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService, Producto } from '../../../core/services/product.service';

@Component({
  selector: 'app-admin-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './product-form.html',
})
export class AdminProductFormComponent implements OnInit {
  product: any = { categoria: {} };
  isEditMode = false;
  categories = [{id: 1, nombre: 'Deportivo'}, {id: 2, nombre: 'Formal'}, {id: 3, nombre: 'Casual'}];
  
  // propiedades para la carga de imagenes
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  isUploading = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.productService.getProductById(+id).subscribe(data => {
        this.product = data;
        this.imagePreview = data.imagenUrl; // imagen actual
      });
    }
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
      // previsualización
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  async saveProduct(): Promise<void> {
    this.isUploading = true;

    if (this.selectedFile) {
      try {
        const uploadResponse = await this.productService.uploadImage(this.selectedFile).toPromise();
        if (uploadResponse && uploadResponse.url) {
          this.product.imagenUrl = uploadResponse.url; // Actualiza url de la imagen
        } else {
          throw new Error('La respuesta de la carga de imagen es inválida');
        }
      } catch (error) {
        console.error('Error al subir la imagen', error);
        this.isUploading = false;

        return;
      }
    }

    // Guarda el producto (nuevo o actualizado) con la URL de la imagen
    const saveObservable = this.isEditMode 
      ? this.productService.updateProduct(this.product.id, this.product)
      : this.productService.createProduct(this.product);

    saveObservable.subscribe({
      next: () => {
        this.isUploading = false;
        this.router.navigate(['/admin/productos']);
      },
      error: (err) => {
        console.error('Error al guardar el producto', err);
        this.isUploading = false;
        // Mostrar error al usuario
      }
    });
  }
}