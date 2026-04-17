import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface FeedbackPayload {
  nombre: string;
  email: string;
  categoria: 'sugerencia' | 'error' | 'idea' | 'comentario';
  mensaje: string;
  createdAt: string;
}

export interface Feedback extends FeedbackPayload {
  id: number;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://localhost:3000/feedbacks';

  constructor(private http: HttpClient) {}

  createFeedback(payload: FeedbackPayload): Observable<Feedback> {
    return this.http.post<Feedback>(this.apiUrl, payload);
  }

  getFeedbacks(): Observable<Feedback[]> {
    return this.http.get<Feedback[]>(this.apiUrl);
  }

  getFeedbackById(id: number): Observable<Feedback> {
    return this.http.get<Feedback>(`${this.apiUrl}/${id}`);
  }
}
