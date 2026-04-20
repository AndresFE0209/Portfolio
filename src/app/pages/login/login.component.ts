import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  cargando = false;

  constructor(private authService: AuthService) {}

  entrar(): void {
    this.error = '';
    if (this.email.trim() == '' || this.password.trim() == ''){
      this.error = 'Rellena email y password, no pueden estar vacios';
      return;
    }

    this.cargando = true;

    this.authService.iniciarSesion(this.email.trim(), this.password.trim()).subscribe({
      next: (ok) => {
        this.cargando = false;

        if (ok) {
          location.href = '/admin';
        } else {
          this.error = 'Credenciales incorrectas';
        }
      },
      error: () => {
        this.cargando = false;
        this.error = 'Error al iniciar sesion';
      }
    });
  }
}