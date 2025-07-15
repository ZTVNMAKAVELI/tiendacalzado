import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacto',
  standalone: true, 
  imports: [CommonModule, FormsModule], 
  templateUrl: './contacto.html',
  styleUrls: ['./contacto.scss'] 
})
export class ContactoComponent {
  form: any = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };
  isLoading = false;
  isSuccessful = false;
  formSubmitted = false; 
  responseMessage = '';

  constructor() { } 

  onSubmit(): void {
    this.isLoading = true;
    this.formSubmitted = true; 

    setTimeout(() => {

      const success = Math.random() > 0.3;

      if (success) {
        this.isSuccessful = true;
        this.responseMessage = 'Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo pronto.';

        this.form = { nombre: '', email: '', asunto: '', mensaje: '' };
      } else {
        this.isSuccessful = false;
        this.responseMessage = 'Hubo un problema al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde.';
      }
      this.isLoading = false;
    }, 1500);
  }
}