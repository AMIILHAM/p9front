import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  isLoggedIn = false;
  roles: string[] = [];
  errorMessage = '';

  form: any = {
    username: null,
    password: null
  };

  public is_show_pin: Boolean = false;
  public tfa: any;

  constructor(private router: Router, private authService: AuthService) {}

  login(){
    this.authService.login(this.form).subscribe(
      data => {
        if (data.Token.access_token) {
          this.authService.tokenStorageService.saveToken(data.Token.access_token);
          this.authService.tokenStorageService.saveRefreshToken(data.Token.refresh_token);
          this.authService.tokenStorageService.saveUser(data);
          this.isLoggedIn = true;
          this.isLoggedIn = true;
          this.roles = this.authService.tokenStorageService.getUser().roles;
          this.router.navigate(['/']);
        } else {
          this.is_show_pin = true;
          if (data.dataURL) {
            this.tfa = data;
          }
        }
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  ngOnInit(): void {
    if (this.authService.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.authService.tokenStorageService.getUser().roles;
      this.router.navigate(['/']);
    }
  }
}
