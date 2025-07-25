import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { StorageService } from './storage.service';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagenUrl: string;
  categoria: {
    id: number;
    nombre: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // URL base de API.
  // private apiUrl = 'http://localhost:8080/api/productos';
  // private fileApiUrl = 'http://localhost:8080/api/files';
private apiUrl = `${environment.apiBaseUrl}/productos`;
private fileApiUrl = `${environment.apiBaseUrl}/files`;

  constructor(private http: HttpClient, private storageService: StorageService) { }

  //Método petición GET a la API de Productos.
  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Método petición GET a la API con ID del producto.
  getProductById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('file', file);

    const user = this.storageService.getUser();
  const token = user?.token || '';
    return this.http.post<{ url: string }>(`${this.fileApiUrl}/upload`, formData, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  }
}
