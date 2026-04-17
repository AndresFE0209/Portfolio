import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const isLoggedin = localStorage.getItem('token_email') != null;
  const isAdmin = localStorage.getItem('rol') == 'admin';

  if (isLoggedin && isAdmin) {
    return true;
  } else if (isLoggedin && !isAdmin) {
    router.navigate(['/home']);
    return false;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
