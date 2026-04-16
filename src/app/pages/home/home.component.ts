import { AfterViewInit, Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap/gsap-core';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit{
  tecnologias = [
    {
      nombre: 'Angular',
      imagen: '/assets/angular.png',
      enlace: 'https://angular.dev'
    },
    {
      nombre: 'SpringBoot',
      imagen: '/assets/springboot.png',
      enlace: 'https://spring.io/projects/spring-boot'
    },
    {
      nombre: 'Java',
      imagen: '/assets/java.png',
      enlace: 'https://www.java.com'
    },
    {
      nombre: 'Supabase',
      imagen: '/assets/supabase.png',
      enlace: 'https://supabase.com'
    }
  ];

  ngAfterViewInit(): void {
    gsap.from('.card-item', {
      duration: 0.6,
      opacity: 0,
      y: 30,
      stagger: 0.15,
      ease: 'power2.out' 
    });
  }
}
