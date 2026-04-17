import { Component } from '@angular/core';
import { gsap } from 'gsap';
import { CvItem, CvStackComponent } from '../../components/cv-stack/cv-stack.component';

@Component({
  selector: 'app-about',
  imports: [CvStackComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  sello = false;
  fotoVisible = false;

  datos = {
    pais: 'ESPAÑA',
    nombre: 'Andres Fernandez',
    rol: 'FullStack Dev',
    id: 'W2M-ANG-0825',
    nac: '1991-09-02',
    exp: '2026-03-23'
  };

  formacion: CvItem[] = [
    {
      periodo: '2024 - 2026',
      titulo: 'CFGS Desarrollo de Aplicaciones Multiplataforma',
      entidad: 'IES Albarregas',
      detalle: 'Java, SQL , Flutter, Kotlin, Python y buenas practicas de desarrollo.'
    },
    {
      periodo: '2011-2016',
      titulo: 'CFGS Administración de Sistemas Informaticos en Red',
      entidad: 'IES Albarregas',
      detalle: 'Redes, Lenguaje de Marcas, SQL, Servicios y Seguridad.'
    },
    {
      periodo: '2008-2010',
      titulo: 'CFGM Explotación de Sistemas Informaticos',
      entidad: 'IES Tierrablanca',
      detalle: 'Sistemas Operativos, Mantenimiento de Equipos y sistemas informaticos, Aplicacions Ofimaticas.'
    }
  ];

  experiencia = [
    {
      periodo: '2026 - Actualidad',
      puesto: 'Practicas DAM',
      empresa: 'Plexus Tech',
      detalle: 'Desarrollo de interfaces con Angular y SpringBoot.'
    },
    {
      periodo: 'Proyecto personal',
      puesto: 'Portfolio Web',
      empresa: 'Personal',
      detalle: 'Diseno y desarrollo de portfolio con Angular'
    },
    {
      periodo: 'Actualidad',
      puesto: 'Desarrollador de RutexGo',
      empresa: 'TurisTech Team',
      detalle: 'Desarrollo de proyecto intermodular con flutter y firebase.'
    },
  ];

  get experienciaCV(): CvItem[] {
    return this.experiencia.map((item) =>({
      periodo: item.periodo,
      titulo: item.puesto,
      entidad: item.empresa,
      detalle: item.detalle
    }));
  }

  onStampClick(event: Event): void {
    if (this.sello) return;

    const box = event.currentTarget as Element | null;
    if (!box) return;

    const marca = box.querySelector('.marca-sellado');
    if (!marca) return;

    this.sello = true;
    box.classList.add('sellado');

    setTimeout(() => {
      this.fotoVisible = true;
    }, 300);

    gsap.timeline()
      .set(marca, { autoAlpha: 0, scale: 1.35, rotate: -3, y: -6 })
      .to(box, { duration: 0.09, scale: 0.94, ease: 'power2.out' })
      .to(box, { duration: 0.12, scale: 1, ease: 'back.out(2)' })
      .to(marca, { duration: 0.2, autoAlpha: 1, scale: 1, y: 0, rotate: 0, ease: 'power2.out' }, '-=0.10');
  }
}