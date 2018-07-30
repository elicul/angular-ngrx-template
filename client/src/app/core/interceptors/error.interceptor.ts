import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CacheHandlerService } from '../services/cache-handler.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private cacheHandlerService: CacheHandlerService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request)
        .pipe(
            catchError((response: any) => {
              if (response instanceof HttpErrorResponse && response.status === 401) {
                this.cacheHandlerService.removeUserToken();
                this.router.navigateByUrl('/login');
              }

              return throwError(response);
            })
        );
  }
}
