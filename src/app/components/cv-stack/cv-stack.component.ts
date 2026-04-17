import { Component, Input } from '@angular/core';

export interface CvItem{
  periodo: string;
  titulo: string;
  entidad: string;
  detalle: string;
}

@Component({
  selector: 'app-cv-stack',
  imports: [],
  templateUrl: './cv-stack.component.html',
  styleUrl: './cv-stack.component.scss'
})
export class CvStackComponent {
  @Input() tituloSeccion = '';
  @Input() items: CvItem[] = [];
}
