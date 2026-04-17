import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Usuario {
  nombre: string;
  email: string;
  password: string;
  rol?: 'admin' | 'user';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/profile';
  private http = inject(HttpClient);
  private usuarioActual: Usuario | null = null;

  obtenerUsuarioPorEmail (email: string): Observable<Usuario[]> {
    const url = `${this.apiUrl}?email=${email}`;
    return this.http.get<Usuario[]>(url);
  }

  establecerUsuarioActual (usuario: Usuario): void {
    this.usuarioActual = usuario; 
  }

  iniciarSesion (email: string, password: string): Observable<boolean> {
    return this.obtenerUsuarioPorEmail(email).pipe(
      map((usuarios) => {
        const usuario = usuarios[0];
        
        if (!usuario) return false;

        if (usuario.password != password) return false;

        this.usuarioActual = usuario;
        localStorage.setItem('token_email', usuario.email);
        localStorage.setItem('rol', usuario.rol ?? 'user');
        localStorage.setItem('nombre_usuario', usuario.nombre);

        return true;
      })
    );
  }

  obtenerToken(): string {
    return localStorage.getItem('token_email') || '';
  }

  estaAutenticado(): boolean {
    return this.obtenerToken() !== '';
  }

  esAdmin(): boolean {
    return localStorage.getItem('rol') === 'admin';
  }
}
