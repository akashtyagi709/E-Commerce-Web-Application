import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { ApiService } from '../Services/api.service';

@Injectable()
export class RequestModifierInterceptor implements HttpInterceptor {

  constructor(private apiService :ApiService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   this.apiService.apiStatus='pending';
    const API_KEY='headerKey1234';

const req=request.clone({
  setHeaders:{API_KEY}
  })
  return next.handle(req).pipe(
    tap({
      next: (event: HttpEvent<unknown>) => {
        if (event instanceof HttpResponse) {
          // Here you could also inspect the response if needed
        }
      },
      error: (error) => {
        console.error('Error occurred:', error);
        // You can handle errors here if needed
      }
    }),
    finalize(() => {
      // Update the API status to 'success' once the response is received (successful or not)
      this.apiService.apiStatus = 'success';
      console.log('API Status updated to:', this.apiService.apiStatus);
    })
  );
}
}