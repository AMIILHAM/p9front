import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';



const TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'auth-refreshtoken';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private jwtHelper: JwtHelperService) { }

  signOut(): void {
    window.sessionStorage.clear();
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveRefreshToken(token: string): void {
    window.sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    const user = this.getUser();
    if (user.id) {
      this.saveUser({ ...user, accessToken: token });
    }
  }

  public hasAnyRoles(roles: string[]): boolean {
    const token = this.getToken()
    if(token){
      const userRoles = this.jwtHelper.decodeToken(token).roles;
      if (userRoles) {
        return -1 !== userRoles?.findIndex((role: string) => roles?.includes(role));
      }
    }
    return false
  }

  public hasRole(requiredRole: string): boolean {
    const token = this.getToken()
    if(token){
      const userRoles = this.jwtHelper.decodeToken(token).roles;
      return -1!==userRoles?.findIndex((role: string) => requiredRole === role);
    }
    return false
  }
}
