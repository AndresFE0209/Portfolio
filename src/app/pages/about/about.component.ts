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
  selloPuesto = false;

  datos= {
    pais: 'ESPAÑA',
    nombre: 'Andres Fernandez Exposito',
    rol: 'FullStack Dev',
    id: 'W2M-ANG-0825',
    nac: '1991-09-02',
    exp: '2026-03-23'
  };

  moverSello(event: MouseEvent, selloHerramienta: Element): void {
    const tarjeta = event.currentTarget as Element;
    const rect = tarjeta.getBoundingClientRect();

    const x = event.clientX - rect.left - 30;
    const y = event.clientY - rect.top - 55;

    gsap.to(selloHerramienta, {
      x,
      y,
      duration: 0.12,
      ease: 'power1.out'
    });
  }

  ponerSello(selloFinal: Element): void {
    this.selloPuesto = false;

    gsap.set(selloFinal, {
      opacity: 0,
      scale: 1.3,
      rotate: -12
    })
  }
}
