import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {INote} from "../model/note.model";


export type EntityResponseType = HttpResponse<INote>;
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public resourceUrl = 'http://localhost:8080/notes';
  constructor(private http: HttpClient) {
  }

  findAllNotesByPatientId(id: number): Observable<EntityResponseType> {
    return this.http
      .get<INote>(`${this.resourceUrl}/all/${id}`, { observe: 'response' });
  }

  createOrUpdateNote(obj: any): Observable<HttpResponse<any>> {
    return this.http
      .post<string[]>(`${this.resourceUrl}/save`, obj, { observe: 'response' });
  }

  deleteNoteById(id: string) : Observable<HttpResponse<any>>{
    return this.http.delete(`${this.resourceUrl}/delete/${id}`, { observe: 'response' });
  }
}
