import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
  

    { path: 'home',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
    },

    { path: 'about', 
    loadComponent:() => import('./pages/about/about.component').then(m => m.AboutComponent)
    },
  
    { path: 'contact',
        loadComponent:() => import ('./pages/contact/contact.component').then(m => m.ContactComponent),
    },

    {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },

  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/admin/admin.component').then((m) => m.AdminComponent),
  },

    { path: '**', redirectTo: 'home' },
];
