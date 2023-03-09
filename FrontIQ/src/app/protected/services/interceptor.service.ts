import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private auth: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    console.log('interceptor');
    let intReq = req;
    const token = localStorage.getItem('token');
    console.log('token', token);

    if(token != null){
      intReq = req.clone({ 
        setHeaders: { Authorization: `Bearer ${token}` },
    });
  }
  return next.handle(intReq);
    //throw new Error('Method not implemented.');
  }
}

//export const interceptorProvider = [{provider: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true}]
