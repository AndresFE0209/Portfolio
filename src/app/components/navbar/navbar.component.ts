import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { gsap } from 'gsap';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [ 
    CommonModule,
    MatToolbarModule, 
    MatButtonModule, 
    RouterLink, 
    RouterLinkActive, 
    MatIconModule, 
    MatMenuModule, 
    TranslateModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {

  public idiomaActual: string;
  constructor(
    public authService: AuthService, 
    public translate: TranslateService
  ) {
    this.idiomaActual = this.translate.getBrowserLang() || 'es';
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.idiomaActual = event.lang;
    });
  }

  ngAfterViewInit(): void {
    this.animacionEntradaBotones();
  }

  animacionEntradaBotones(): void {
    gsap.from('.btn-nav', {
      y: -12,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out'
    });
  }

  zoomHover(event: MouseEvent): void {
    const boton = event.currentTarget as HTMLElement;

    gsap.to(boton, {
      scale: 1.12,
      duration: 0.2,
      ease: 'power2.out'
    });
  }

  zoomOut(event: MouseEvent): void {
    const boton = event.currentTarget as HTMLElement;

    gsap.to(boton, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    });
  }

  zoomClick(event: MouseEvent): void {
    const boton = event.currentTarget as HTMLElement;

    gsap.to(boton, {
      scale: 1.18,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out'
    });
  }

  cerrarSesion(): void {
    localStorage.removeItem('token_email');
    localStorage.removeItem('rol');
    localStorage.removeItem('nombre_usuario');
    location.reload();
  }

  ngOnDestroy(): void {
    gsap.killTweensOf('.btn-nav');
  }

  cambiarIdioma(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const idiomaSeleccionado = selectElement.value;
    this.translate.use(idiomaSeleccionado);
  }

  cambiarIdiomaManual(lang: string): void {
    this.translate.use(lang);
  }
}