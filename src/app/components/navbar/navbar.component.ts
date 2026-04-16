import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-navbar',
  imports: [MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements AfterViewInit, OnDestroy {
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

  ngOnDestroy(): void {
    gsap.killTweensOf('.btn-nav');
  }
}