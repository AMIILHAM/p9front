import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _config!: Configuration;
  constructor(private http: HttpClient) {}

  async init() {
    const config$ = this.http.get<Configuration>('assets/env.json');
    this._config = await lastValueFrom(config$);
  }

  public get config(): Configuration {
    return this._config;
  }
}

interface Configuration {
  BASE_URI: string;
}
