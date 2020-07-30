import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpParams, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {exhaustMap, take} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
// @ts-ignore
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.auth.user.pipe(take(1), exhaustMap( user => {
      if (!user) {
      return  next.handle(request);
    }
      const modReq = request.clone({headers: new HttpHeaders().append('Authorization', 'Bearer ' + user.Token).append('Access-Control-Allow-Origin', 'http://localhost:4200').append('Access-Control-Allow-Credentials',  'true')});
      return next.handle(modReq);
  }));
  }
}
