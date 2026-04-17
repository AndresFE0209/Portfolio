import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

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
          this.router.navigate(['/admin']);
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
