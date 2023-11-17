import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import {TokenStorageService} from "../../service/token-storage.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  collapsed = true;
  constructor(
    protected tokenStorageService:TokenStorageService,
    protected jwtHelper:JwtHelperService,
    protected router:Router,
    private modalService: NgbModal) {}

  isLoggedIn(){
    return this.tokenStorageService.getToken();
  }

  getUserName(){
    const token = this.tokenStorageService.getToken()
    if(token){
      return this.jwtHelper.decodeToken(token).username
    }
    return false
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

}
