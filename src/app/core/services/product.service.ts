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
  // La categoría puede ser un objeto más complejo, pero para la lista es suficiente con el nombre.
  categoria: {
    id: number;
    nombre: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // La URL base de tu API de Spring Boot.
  private apiUrl = 'http://localhost:8080/api/productos';

  // Inyectamos el HttpClient que configuramos en app.config.ts
  constructor(private http: HttpClient) { }

  // Este método hace una petición GET a la API y espera recibir un array de Productos.
  getProducts(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  // Hace una petición a la URL con el ID del producto.
  getProductById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  // getProductById(id: number): Observable<Product> { ... }

}
