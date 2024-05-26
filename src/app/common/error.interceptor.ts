import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router, private messageService: MessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.authService.logout();

          localStorage.clear();

          this.router.navigate(['auth/login']);
        }

        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong!', life: 3000 });

        const error = err.error.message || err.statusText;

        return throwError(() => new Error(error))
      })
    )
  }
}
