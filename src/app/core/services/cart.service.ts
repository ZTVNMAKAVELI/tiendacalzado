import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, map } from 'rxjs';
import { Producto } from './product.service';

export interface CartItem {
  product: Producto;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly CART_STORAGE_KEY = 'my_cart';
  private isBrowser: boolean;

  private itemsSubject = new BehaviorSubject<CartItem[]>([]);
  public items$ = this.itemsSubject.asObservable();

  public total$ = this.items$.pipe(
    map(items => items.reduce((total, item) => total + (item.product.precio * item.quantity), 0))
  );

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Verificamos si estamos en el navegador al construir el servicio.
    this.isBrowser = isPlatformBrowser(this.platformId);
    // Si estamos en el navegador, cargamos el carrito desde localStorage.
    if (this.isBrowser) {
      this.itemsSubject.next(this.getCartFromStorage());
    }
  }

  private getCartFromStorage(): CartItem[] {
    // Esta función ahora solo se llamará si estamos en el navegador.
    try {
      const cartJson = localStorage.getItem(this.CART_STORAGE_KEY);
      return cartJson ? JSON.parse(cartJson) : [];
    } catch (e) {
      console.error('Error al leer el carrito de localStorage', e);
      return [];
    }
  }

  private saveCartToStorage(items: CartItem[]): void {
    // Solo guardamos si estamos en el navegador.
    if (this.isBrowser) {
      try {
        localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
      } catch (e) {
        console.error('Error al guardar el carrito en localStorage', e);
      }
    }
  }

  private updateCart(items: CartItem[]): void {
    this.itemsSubject.next(items);
    this.saveCartToStorage(items);
  }

  addToCart(product: Producto, quantity: number): void {
    if (quantity <= 0) return;
    const currentItems = this.itemsSubject.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }
    this.updateCart([...currentItems]);
  }

  removeItem(productId: number): void {
    const currentItems = this.itemsSubject.getValue();
    const filteredItems = currentItems.filter(item => item.product.id !== productId);
    this.updateCart(filteredItems);
  }

  updateQuantity(productId: number, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const currentItems = this.itemsSubject.getValue();
    const itemToUpdate = currentItems.find(item => item.product.id === productId);
    if (itemToUpdate) {
      itemToUpdate.quantity = newQuantity;
      this.updateCart([...currentItems]);
    }
  }

  clearCart(): void {
    this.updateCart([]);
  }
}