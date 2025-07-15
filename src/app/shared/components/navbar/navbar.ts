import { Component, OnInit, OnDestroy, AfterViewInit, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { StorageService } from '../../../core/services/storage.service';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Subscription } from 'rxjs';

declare var phosphor: any;

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit, OnDestroy, AfterViewInit {

  isLoggedIn = false;
  name?: string;
  isAdmin = false;
  isMobileMenuOpen = false;
  isUserDropdownOpen = false;
  cartItemCount = 0;
  private cartSubscription!: Subscription;

  constructor(
    private storageService: StorageService,
    private cartService: CartService,
    private router: Router,
    private elementRef: ElementRef
  ) {
    
    this.checkLoginStatus();
  }

  ngOnInit(): void {
    this.cartSubscription = this.cartService.items$.subscribe(items => {
      this.cartItemCount = items.reduce((total, item) => total + item.quantity, 0);
    });
  }

  private checkLoginStatus(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.name = user.name;
      this.isAdmin = user.roles.includes('ROLE_ADMIN');
    } else {
      this.isAdmin = false;
      this.name = undefined;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (this.isMobileMenuOpen) {
      this.isUserDropdownOpen = false; // Cierra dropdown
    }
  }

  toggleUserDropdown(): void {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  // Cerrar el dropdown si se hace clic fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {

    if (this.isUserDropdownOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.closeUserDropdown();
    }
  }

  closeUserDropdown(): void {
    this.isUserDropdownOpen = false;
  }

  ngAfterViewInit(): void {
    if (typeof phosphor !== 'undefined' && phosphor.scan) {
      phosphor.scan();
    }
  }

  logout(): void {
    this.storageService.clean();
    this.isLoggedIn = false;
    this.isAdmin = false;
    this.name = undefined;
    this.isUserDropdownOpen = false;
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