import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService, CartItem } from '../../../core/services/cart.service';
import { OrderService } from '../../../core/services/order.service';
import { LoaderComponent } from '../../../shared/components/loader/loader';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterLink, LoaderComponent],
  templateUrl: './checkout.html',
  styleUrls: ['./checkout.scss']
})
export class CheckoutComponent implements OnInit {
  cartItems$: Observable<CartItem[]>;
  cartTotal$: Observable<number>;
  
  // Estados creación del pedido
  isProcessing = false;
  orderSuccess = false;
  orderError: string | null = null;

  private currentCartItems: CartItem[] = [];

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.cartItems$ = this.cartService.items$;
    this.cartTotal$ = this.cartService.total$;
  }

  ngOnInit(): void {
    // Guardamos el estado carrito
    this.cartItems$.subscribe(items => {
      this.currentCartItems = items;
    });
  }

  placeOrder(): void {
    if (this.currentCartItems.length === 0) {
      this.orderError = "Tu carrito está vacío.";
      return;
    }

    this.isProcessing = true;
    this.orderError = null;

    this.orderService.createOrder(this.currentCartItems).subscribe({
      next: (response) => {
        console.log('Pedido creado exitosamente', response);
        this.isProcessing = false;
        this.orderSuccess = true;
        this.cartService.clearCart();
      },
      error: (err) => {
        console.error('Error al crear el pedido', err);
        this.isProcessing = false;
        this.orderError = "Hubo un problema al procesar tu pedido. Por favor, intenta de nuevo.";
      }
    });
  }
}