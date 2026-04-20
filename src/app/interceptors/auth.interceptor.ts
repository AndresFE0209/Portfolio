import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token_email');

  if (!token) {
    return next(req);
  }

  const reqConAuth = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' + token,
      'x-user-email': token
      }
    });

  return next(reqConAuth);
};