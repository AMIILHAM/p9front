import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {IPatient} from "../model/patient.model";
import {Observable} from "rxjs";
import {ISearchPage} from "../model/search-page.model";
import {createRequestOption} from "../core/request/request-util";


type EntityResponseType = HttpResponse<IPatient>;
export type patientSearchPageResponseType = HttpResponse<ISearchPage<IPatient[]>>;


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  public resourceUrl = 'http://localhost:8080/patients';
  constructor(private http: HttpClient) {
  }

  findPatientById(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPatient>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getAllByCriteria(req?: any): Observable<patientSearchPageResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISearchPage<IPatient[]>>(this.resourceUrl, { params: options, observe: 'response' });
  }

  createOrUpdatePatient(obj: any): Observable<HttpResponse<any>> {
    return this.http
      .post<string[]>(this.resourceUrl, obj, { observe: 'response' });
  }

  deletePatient(id: number): Observable<HttpResponse<any>> {
    return this.http
      .delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
