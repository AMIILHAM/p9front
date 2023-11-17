import { APP_INITIALIZER, LOCALE_ID, NgModule } from "@angular/core";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { registerLocaleData } from '@angular/common';
import locale from '@angular/common/locales/fr';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { LoaderInterceptor } from "./interceptors/loader-interceptor.service";
import { ErrorHandlerInterceptor } from "./interceptors/error-handler.interceptor";
import { AuthInterceptor } from "./interceptors/auth.interceptor";
import { initializer } from "./init/app-init";
import { JwtModule } from "@auth0/angular-jwt";
import {ConfigService} from "../service/config.service";
import {LANGUAGE} from "../enum/language";

export function getToken() {
  return localStorage.getItem('access_token');
}

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, 'assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken
      }
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,useFactory: initializer,multi: true,deps: [ConfigService]
    },
    { provide: LOCALE_ID, useValue: LANGUAGE.FR },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHandlerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
})

export class CoreModule {
  constructor() {
    registerLocaleData(locale);
  }
}
