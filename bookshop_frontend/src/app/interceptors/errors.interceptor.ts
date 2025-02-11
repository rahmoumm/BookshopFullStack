import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router); 
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 403) {
        // Redirect to login page on 401 Unauthorized
        router.navigate(['unauthentified']);
      }
      return throwError(() => error); // Rethrow the error
    })
  );
};
