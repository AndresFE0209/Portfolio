import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  datos = {
    pais: 'ESPAÑA',
    nombre: 'Andres Fernandez',
    rol: 'FullStack Dev',
    id: 'W2M-ANG-0825',
    nac: '1991-09-02',
    exp: '2026-03-23'
  };
}