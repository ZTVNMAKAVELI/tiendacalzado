import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CartItem } from './cart.service';

export interface Order {
    id: number;
    fechaCreacion: string;
    total: number;
    detalles: {
        productoNombre: string;
        cantidad: number;
        precio: number;
        productoImagenUrl: string;
    }[];
}

const ORDER_API = 'http://localhost:8080/api/orders';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private http: HttpClient) { }

  createOrder(cartItems: CartItem[]): Observable<any> {

    const orderPayload = cartItems.map(item => ({
      productId: item.product.id,
      quantity: item.quantity
    }));

    return this.http.post(ORDER_API, orderPayload);
  }

    getMyOrders(): Observable<Order[]> {

      return this.http.get<Order[]>(`${ORDER_API}/my-orders`);
  }
}