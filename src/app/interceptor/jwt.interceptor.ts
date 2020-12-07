import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { KeycloakService } from '@internal-apps/hsdg-front-lib';
import { Injectable } from "@angular/core";


// @Injectable()
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = KeycloakService.auth.authz.token;

    if (token) {
      request = request.clone({
          setHeaders: {
              Authorization: `Bearer ${token}`
          }
      });
    }

    return next.handle(request);
  }

}
