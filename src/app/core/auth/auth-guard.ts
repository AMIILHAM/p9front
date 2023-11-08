import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

import {ConfigService} from "../../service/config.service";
import {AuthService} from "../../service/auth.service";
import {catchError, throwError} from "rxjs";



@Injectable({ providedIn: 'root' })
export class AuthGuard {
  public resourceUrl: string = '';
    constructor(
        private router: Router,
        private authService : AuthService,
        private configService: ConfigService
    ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.resourceUrl = this.configService?.config?.BASE_URI;
    const token = this.authService.tokenStorageService.getRefreshToken();
    if (this.authService.isTokenValid()) {
      return true;
    }else if (token) {
      return this.authService.refreshToken(token, this.resourceUrl)
        .pipe(
          catchError((err) => {
            this.authService.tokenStorageService.signOut();
            this.router.navigate(['/login']);
            return throwError(err);
          })
        );
    }
    this.router.navigate(['/login']);
    return false;
  }
}
