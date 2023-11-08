import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {Risque} from "../enum/risque";
import {Observable} from "rxjs";


export type EntityResponseType = HttpResponse<Risque>;

@Injectable({
  providedIn: 'root'
})
export class RisqueService {

  public resourceUrl = 'http://localhost:8083/risque/analyse';

  constructor(private http: HttpClient, private configService: ConfigService) {
    //this.resourceUrl = this.configService.config.BASE_URI + '/risque/analyse';
  }

  getPatientRisqueStatus(id: number): Observable<EntityResponseType> {
    return this.http
      .get<Risque>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

}
