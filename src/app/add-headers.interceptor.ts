import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddHeadersInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler):Observable<HttpEvent<unknown>> {
    let userToken = localStorage.getItem('userToken')
    if (userToken) {
      let newRequest = request.clone({
        headers: request.headers.set('token', userToken)
      })
      return next.handle(newRequest)
    }
    return next.handle(request)
  }
}