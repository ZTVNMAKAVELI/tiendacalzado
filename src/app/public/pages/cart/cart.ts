import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrls: ['./cart.scss']
})
export class CartComponent {

  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;

  showRemoveConfirmation: boolean = false;
  itemToRemoveId: number | null = null;
  itemToRemoveName: string = '';

  showClearConfirmation: boolean = false;

  constructor(private cartService: CartService) {
    this.cartItems$ = this.cartService.items$.pipe(
      
      map(items => items.sort((a, b) => a.product.nombre.localeCompare(b.product.nombre)))
    );
    this.cartTotal$ = this.cartService.total$;
  }

  onRemoveItem(productId: number): void {
    let currentItems: CartItem[] = [];
    this.cartService.items$.subscribe(items => currentItems = items).unsubscribe();
    const item = currentItems.find(i => i.product.id === productId);
    if (item) {
      this.itemToRemoveId = productId;
      this.itemToRemoveName = item.product.nombre;
      this.showRemoveConfirmation = true;
    }
  }

  confirmRemoveItem(confirm: boolean): void {
    if (confirm && this.itemToRemoveId !== null) {
      this.cartService.removeItem(this.itemToRemoveId);
    }
    this.showRemoveConfirmation = false;
    this.itemToRemoveId = null;
    this.itemToRemoveName = '';
  }

  onUpdateQuantity(productId: number, newQuantity: number): void {
    
    const quantity = Math.max(1, Math.floor(newQuantity));
    this.cartService.updateQuantity(productId, quantity);
  }


  onClearCart(): void {
    this.showClearConfirmation = true;
  }

  confirmClearCart(confirm: boolean): void {
    if (confirm) {
      this.cartService.clearCart();
    }
    this.showClearConfirmation = false;
  }
}
