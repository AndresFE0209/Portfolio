import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export interface FeedbackSocketMessage {
  type: 'connection' | 'feedback-nuevo' | 'feedback-actualizado' | 'feedback-eliminado';
  payload?: {
    id?: number;
    nombre?: string;
    email?: string;
    categoria?: string;
    mensaje?: string;
    createdAt?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket: WebSocket | null = null;
  private mensajesSubject = new Subject<FeedbackSocketMessage>();

  conectar(url: string): void {
    if (this.socket) {
      this.desconectar();
    }

    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      this.mensajesSubject.next({
        type: 'connection',
        payload: {}
      });
    };

    this.socket.onmessage = (event) => {
      const mensaje = JSON.parse(event.data) as FeedbackSocketMessage;
      this.mensajesSubject.next(mensaje);
    };

    this.socket.onclose = () => {
      this.socket = null;
    };
  }

  getMessages(): Observable<FeedbackSocketMessage> {
    return this.mensajesSubject.asObservable();
  }

  enviarMensaje(mensaje: FeedbackSocketMessage): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(mensaje));
    }
  }

  desconectar(): void {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}