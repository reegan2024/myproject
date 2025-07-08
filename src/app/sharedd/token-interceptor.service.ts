import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private auservice: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //let auservice=this.inject
    let jwttoken = req.clone({
      setHeaders: { Authorization: 'Bearer ' + this.auservice.getToken() }
    });
console.log("in interceptor");
    return next.handle(jwttoken);
  }
}
