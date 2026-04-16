import { Component, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about',
  imports: [MatButtonToggleModule, MatCardModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  seccionActiva = signal('perfil');

  timeline = [
    { titulo: 'DAM', texto: 'Actualmente estudiando 2º de Desarrollo de Aplicaciones Multiplataformas'},
    { titulo: 'Practicas en Plexus Tech', texto: 'Estoy mejorando cada semana en frontend y backend.' },
    { titulo: 'Stack actual', texto: 'Angular, Spring Boot, Java y Supabase.' }
  ];

  interes = ['Lectura', 'Videojuegos', 'Deportes', 'Puzzles']
  
  cambiarSeccion(seccion: string): void {
    this.seccionActiva.set(seccion);
  }
}
