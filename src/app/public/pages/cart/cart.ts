import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class CartComponent {
  // El pipe 'async' en la plantilla se encargará de la suscripción.
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.items$;
    this.cartTotal$ = this.cartService.total$;
  }

  // Métodos para interactuar con el servicio desde la plantilla.
  onRemoveItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  onUpdateQuantity(productId: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newQuantity = parseInt(inputElement.value, 10);
    this.cartService.updateQuantity(productId, newQuantity);
  }

  onClearCart(): void {
   
    this.cartService.clearCart();
  }
}
