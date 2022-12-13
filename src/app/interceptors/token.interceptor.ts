import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';
import { pipe } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, private router: Router) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(this.authService.getToken());
    if (this.authService.getToken() !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.getToken()}`,
        },
      });
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
          } else {
            if (error.status == 401) {
              localStorage.clear();
              this.router.navigate(['/login']);
            }
            if (error.status == 403) {
              errorMsg = '403';
            }
          }
          // console.log(errorMsg);
          return throwError(() => new Error(errorMsg));
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
