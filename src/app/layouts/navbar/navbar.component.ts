import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {TokenStorageService} from "../../service/token-storage.service";
import {Authority} from "../../enum/authority";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {

  sidebar:any[]= [
    {libelle: "Accueil", authorities: [Authority.USER], route:"/"},
    {
      libelle: "Patients", isCollapsed: true, authorities: [Authority.USER],
      children: [
        {libelle: "Patients", authorities: [Authority.USER], route: "patients"}
      ]
    },
  ]

  constructor(
    private tokenStorageService: TokenStorageService,
    protected router:Router,
  ) {}

  ngOnInit(): void {
  }


  isLoggedIn(){
    return this.tokenStorageService.getToken();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/login']);
  }

  getUserName() {
    return "User"
  }
}
