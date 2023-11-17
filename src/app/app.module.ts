import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './component/login/login.component';
import {FormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {ToastComponent} from "./layouts/toast/toast.component";
import {LoaderComponent} from "./layouts/loader/loader.component";
import {SpinnerComponent} from "./layouts/spinner/spinner.component";
import {FooterComponent} from "./layouts/footer/footer.component";
import {LayoutComponent} from "./layouts/layout/layout.component";
import {HeaderComponent} from "./layouts/header/header.component";
import {NavbarComponent} from "./layouts/navbar/navbar.component";
import {
  NgbCollapse,
  NgbDropdown,
  NgbDropdownItem,
  NgbDropdownMenu,
  NgbDropdownToggle,
  NgbToast, NgbModule
} from "@ng-bootstrap/ng-bootstrap";
import { HomeComponent } from './component/home/home.component';
import {CoreModule} from "./core/core.module";
import {NgOptimizedImage} from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ToastComponent,
    LoaderComponent,
    SpinnerComponent,
    LayoutComponent,
    FooterComponent,
    HeaderComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    NgbCollapse,
    NgbToast,
    NgbDropdown,
    NgbDropdownToggle,
    NgbDropdownItem,
    NgbDropdownMenu,
    NgbModule,
    NgOptimizedImage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
