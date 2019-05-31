import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate } from '@angular/router';
import { OktaAuthGuard } from '@okta/okta-angular';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  constructor(private oktaAuthGuard: OktaAuthGuard) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree {
    return this.oktaAuthGuard.canActivate(route, state);
  }
}
