import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { RouterLink, RouterLinkActive } from '@angular/router'; 
import { Subscription } from 'rxjs';

declare var phosphor: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})

export class Navbar implements OnInit, OnDestroy, AfterViewInit {
  
  isMobileMenuOpen = false;
  cartItemCount = 0;
  private cartSubscription!: Subscription;

  constructor(private cartService: CartService) {} // Inyectamos el servicio

  ngOnInit(): void {

    this.cartSubscription = this.cartService.items$.subscribe(items => {

      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  ngAfterViewInit(): void {
    if (typeof phosphor !== 'undefined') {
      phosphor.scan();
    }
  }

  // Limpiamos la suscripción
  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
