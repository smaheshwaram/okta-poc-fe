import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { OktaAuthService } from '@okta/okta-angular';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  serverId: string;

  constructor(private oktaAuth: OktaAuthService) {
    this.serverId = environment.serverId;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.handleAccess(request, next));
  }

  private async handleAccess(request: HttpRequest<any>, next: HttpHandler): Promise<HttpEvent<any>> {
    // Only add to known domains since we don't want to send our tokens to just anyone.
    // Also, Giphy's API fails when the request includes a token.
    if (request.urlWithParams.indexOf(this.serverId) > -1) {
      const accessToken = await this.oktaAuth.getAccessToken();
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken
        }
      });
    }
    // TODO: do we want to store requests for retries, etc?
    return next.handle(request).toPromise()
      .then((success: HttpEvent<any>) => {
        return success;
      }).catch(error => {
        if (error instanceof HttpErrorResponse) {
          this.oktaAuth.setFromUri(window.location.pathname);
          if (error.status === 401) {
            this.oktaAuth.logout().then(() => {
              this.oktaAuth.loginRedirect();
            });
          }
        }
        return error;
      });
  }
}
