import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { FeedbackPayload, FeedbackService } from '../../services/feedback.service';
import { TranslateModule } from '@ngx-translate/core';

type CategoriaFeedback = 'sugerencia' | 'error' | 'idea' | 'comentario';

@Component({
  selector: 'app-contact',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    TranslateModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  categorias: ReadonlyArray<{ valor: CategoriaFeedback; etiqueta: string }> = [
    { valor: 'sugerencia', etiqueta: 'Sugerencia' },
    { valor: 'error', etiqueta: 'Error' },
    { valor: 'idea', etiqueta: 'Idea' },
    { valor: 'comentario', etiqueta: 'Comentario' }
  ];

  nombre = '';
  correo = '';
  categoria: CategoriaFeedback | '' = '';
  mensaje = '';

  enviado = false;
  enviando = false;
  mostrarErrores = false;
  mensajeError = '';

  constructor(private readonly servicioFeedback: FeedbackService) {}

  enviarFormulario(): void {
    if (
      this.nombre.trim() === '' ||
      this.correo.trim() === '' ||
      this.categoria.trim() === '' ||
      this.mensaje.trim() === ''
    ) {
      this.mostrarErrores = true;
      return;
    }

    this.mostrarErrores = false;
    this.enviando = true;
    this.enviado = false;
    this.mensajeError = '';

    const payload: FeedbackPayload = {
      nombre: this.nombre.trim(),
      email: this.correo.trim(),
      categoria: this.categoria as CategoriaFeedback,
      mensaje: this.mensaje.trim(),
      createdAt: new Date().toISOString()
    };

    this.servicioFeedback.createFeedback(payload).subscribe({
      next: () => {
        this.enviando = false;
        this.enviado = true;
        this.nombre = '';
        this.correo = '';
        this.categoria = '';
        this.mensaje = '';
      },
      error: () => {
        this.enviando = false;
        this.mensajeError = 'No se pudo enviar el feedback. Intentalo de nuevo.';
      }
    });
  }
}