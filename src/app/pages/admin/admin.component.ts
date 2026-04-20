import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Feedback, FeedbackService } from '../../services/feedback.service';
import { WebsocketService, FeedbackSocketMessage } from '../../services/websocket.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatProgressSpinnerModule, 
    FormsModule,
    TranslateModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit, OnDestroy {
  feedbacks: Feedback[] = [];
  cargando = false;
  error = '';
  estadoWs = 'Desconectado';
  wsConectado = false;
  filtroGeneral = '';

  private wsSub?: Subscription;

  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly websocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    this.cargarFeedbacks();
    this.websocketService.conectar('ws://localhost:3002');
    this.wsSub = this.websocketService.getMessages().subscribe({
      next: (msg: FeedbackSocketMessage) => {
        if (msg.type === 'connection') {
          this.estadoWs = 'Conectado';
          this.wsConectado = true;
        }
        if (msg.type === 'feedback-nuevo') {
          this.cargarFeedbacks();
        }
      },
      error: () => {
        this.estadoWs = 'Error de conexión';
        this.wsConectado = false;
      },
      complete: () => {
        this.estadoWs = 'Desconectado';
        this.wsConectado = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.wsSub?.unsubscribe();
    this.websocketService.desconectar();
  }

  recargar(): void {
    this.cargarFeedbacks();
  }

  private cargarFeedbacks(): void {
    this.cargando = true;
    this.error = '';

    this.feedbackService.getFeedbacks().subscribe({
      next: (respuesta) => {
        this.feedbacks = respuesta.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.cargando = false;
      },
      error: () => {
        this.error = 'No se pudieron cargar los feedbacks';
        this.cargando = false;
      }
    });
  }

  get feedbackFiltrados(){
    const filtro = this.filtroGeneral.trim().toLowerCase();
    if (!filtro) return this.feedbacks;

    return this.feedbacks.filter(fb =>
      (fb.nombre && fb.nombre.toLowerCase().includes(filtro)) ||
      (fb.email && fb.email.toLowerCase().includes(filtro)) ||
      (fb.categoria && fb.categoria.toLowerCase().includes(filtro))
    );
  }
}