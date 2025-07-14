import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { StorageService } from '../../../core/services/storage.service';
import { RouterLink, RouterLinkActive } from '@angular/router'; 
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

declare var phosphor: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar implements OnInit, OnDestroy, AfterViewInit {
  
  isLoggedIn = false;
  name?: string;
  isAdmin = false;
  isMobileMenuOpen = false;
  cartItemCount = 0;
  private cartSubscription!: Subscription;

  constructor(
    private storageService: StorageService, 
    private cartService: CartService,
    private router: Router
  ) {

    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.name = user.name;
      this.isAdmin = user.roles.includes('ROLE_ADMIN'); 
    }
  }

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

  logout(): void {
    this.storageService.clean();
    this.router.navigate(['/login']).then(() => {
        window.location.reload();
    });
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
