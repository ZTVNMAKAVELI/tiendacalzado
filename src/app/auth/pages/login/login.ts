import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { StorageService } from '../../../core/services/storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: '',
    password: ''
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isLoading = false;

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
      
      this.router.navigate(['/catalogo']);
    }
  }

  onSubmit(): void {
    this.isLoading = true; 
    this.isLoginFailed = false;

    this.authService.login(this.form).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.isLoading = false; 
        this.router.navigate(['/catalogo']).then(() => window.location.reload());
      },
      error: err => {
        console.error('Login error:', err);
        this.errorMessage = err.error?.message || 'Credenciales incorrectas o error del servidor. Por favor, inténtalo de nuevo.';
        this.isLoginFailed = true;
        this.isLoading = false; 
      }
    });
  }
}
