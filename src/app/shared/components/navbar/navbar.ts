import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router'; 
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive], 
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  // Esta variable controlará si el menú móvil está visible o no.
  // Por defecto, está cerrado (false).
  isMobileMenuOpen = false;

  // Esta función es llamada por el botón de hamburguesa en el HTML.
  // Simplemente invierte el valor de isMobileMenuOpen.
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
