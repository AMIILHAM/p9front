import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, ReplaySubject, throwError} from "rxjs";
import {TokenStorageService} from "./token-storage.service";
import jwt_decode from 'jwt-decode';
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ConfigService} from "./config.service";



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:4200'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public resourceUrl: string = 'http://localhost:8081';
  private readonly TOKEN_KEY = 'accessToken';
  private readonly TOKEN_EXPIRATION_KEY = 'tokenExpiration';
  private readonly CHECK_INTERVAL = 60000;
  private connectedUser: any;
  private authenticateState = new ReplaySubject<String | null>(1);
  constructor(protected http: HttpClient,
              public tokenStorageService:TokenStorageService,
              private jwtHelper : JwtHelperService,
              private configService: ConfigService,
              private router: Router)
  {
    this.initTokenCheck();
    this.initConnectedUser();
  }

  login(credential: any): Observable<any> {
    return this.http.post(this.resourceUrl + '/auth/login', credential, httpOptions).pipe(
      catchError((error: any) => {
        return throwError(error);
      })
    );
  }
  refreshToken(token: string, url:string): Observable<any> {
    return this.http.post(url+"/auth/refreshToken", {
      refreshToken: token
    }, httpOptions);
  }
  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRATION_KEY);
    this.tokenStorageService.signOut();
    this.router.navigate(['/login'])
  }
  private initConnectedUser() {
    const token = this.tokenStorageService.getToken();
    if (token) {
      this.connectedUser = this.getCurrentUserFromToken(token);
      this.authenticateState.next(this.connectedUser)
    }
  }
  private getCurrentUserFromToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  }
  private initTokenCheck() {
    setInterval(() => {
      if (this.isTokenExpired()) {
        this.tokenStorageService.getRefreshToken();
      }
    }, this.CHECK_INTERVAL);
  }
  private isTokenExpired(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (!token) {
      return true;
    }

    const expiration = this.getTokenExpiration(token);
    return expiration ? Date.now() > expiration : true;
  }
  private getTokenExpiration(token: string): number | null {
    try {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.exp * 1000;
    } catch (error) {
      return null;
    }
  }
  private storeToken(token: string, expirationTime: number) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.TOKEN_EXPIRATION_KEY, expirationTime.toString());
  }
  isTokenValid(): boolean {
    const token = this.tokenStorageService.getToken();
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

}
