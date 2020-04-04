import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

const baseUrl = environment.API_BASE_URL;

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.startsWith('auth') || request.url.startsWith('product')) {
      const url = baseUrl + request.url;
      request = request.clone({
        url: url,
      });
    }

    return next.handle(request);
  }
}
