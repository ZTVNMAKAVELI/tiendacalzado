import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  private apiUrl = 'http://localhost:8080/api/productos';

  // Inyectamos el HttpClient que configuramos en app.config.ts
  constructor(private http: HttpClient) { }

  //Método petición GET a la API de Productos.
  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Método petición GET a la API con ID del producto.
  getProductById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // getProductById(id: number): Observable<Product> { ... }

}
