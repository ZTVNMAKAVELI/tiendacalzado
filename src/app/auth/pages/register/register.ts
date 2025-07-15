import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  form: any = {
    name: '',
    email: '',
    password: ''
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.isLoading = true;
    this.isSignUpFailed = false;

    this.authService.register(this.form).subscribe({
      next: data => {
        console.log('Registro exitoso:', data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.isLoading = false; 
      },
      error: err => {
        console.error('Error registro:', err);
        
                if (err.status === 400 && err.error?.message?.includes('Email already in use')) {
          this.errorMessage = 'Este correo electrónico ya está registrado. Por favor, inicia sesión o usa otro correo.';
        } else {
          this.errorMessage = err.error?.message || 'Hubo un problema al registrarte. Por favor, inténtalo de nuevo.';
        }
        this.isSignUpFailed = true;
        this.isLoading = false; 
      }
    });
  }
}
