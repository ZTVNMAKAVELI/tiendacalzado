import { Injectable } from '@angular/core';
import { BehaviorSubject,map } from 'rxjs';
import { Producto } from './product.service'; // Interfaz de Producto

// Items dentro del carrito
export interface CartItem {
  product: Producto;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly CART_STORAGE_KEY = 'my_cart';
  // BehaviorSubject es un tipo especial de Observable que guarda el último valor emitido.
  private itemsSubject = new BehaviorSubject<CartItem[]>(this.getCartFromStorage());
  public items$ = this.itemsSubject.asObservable();

    // Observable para calcular el total del carrito dinámicamente.
  public total$ = this.items$.pipe(
    map(items => items.reduce((total, item) => total + (item.product.precio * item.quantity), 0))
  );

  constructor() {}

    // Método privado para obtener el carrito desde localStorage.
  private getCartFromStorage(): CartItem[] {
    try {
      const cartJson = localStorage.getItem(this.CART_STORAGE_KEY);
      return cartJson ? JSON.parse(cartJson) : [];
    } catch (e) {
      console.error('Error al leer el carrito de localStorage', e);
      return [];
    }
  }

  // Método privado para guardar el carrito en localStorage.
  private saveCartToStorage(items: CartItem[]): void {
    try {
      localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error al guardar el carrito en localStorage', e);
    }
  }

    private updateCart(items: CartItem[]): void {
    this.itemsSubject.next(items);
    this.saveCartToStorage(items);
  }
  // Método principal para añadir productos al carrito
  addToCart(product: Producto, quantity: number): void {
    if (quantity <= 0) return; // No hacer nada si la cantidad es cero o negativa.

    const currentItems = this.itemsSubject.getValue();
    const existingItem = currentItems.find(item => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      currentItems.push({ product, quantity });
    }

    this.itemsSubject.next([...currentItems]);
    this.saveCartToStorage(currentItems); // Guardamos el estado actualizado.
    console.log('Carrito actualizado:', this.itemsSubject.getValue());
  }

  // Método para eliminar un item del carrito.
  removeItem(productId: number): void {
    const currentItems = this.itemsSubject.getValue();
    const filteredItems = currentItems.filter(item => item.product.id !== productId);
    this.updateCart(filteredItems);
  }

  // Método para actualizar la cantidad de un item.
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

  // Método para vaciar completamente el carrito.
  clearCart(): void {
    this.updateCart([]);
  }
  // getCartTotal() { ... }
}