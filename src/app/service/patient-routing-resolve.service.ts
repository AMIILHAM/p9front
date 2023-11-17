import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router} from "@angular/router";
import {PatientService} from "./patient.service";
import {EMPTY, mergeMap, Observable, of} from "rxjs";
import {IPatient, Patient} from "../model/patient.model";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PatientRoutingResolveService {

  constructor(protected router: Router, private patientService: PatientService) { }

  resolve(route: ActivatedRouteSnapshot) : Observable<IPatient> | Observable<never> {
    const id = route.params['id'];
    if(id) {
      return this.patientService.findPatientById(id).pipe(
        mergeMap((patient : HttpResponse<IPatient>) => {
          if(patient.body){
            return of(patient.body)
          }else {
            this.router.navigate(['404']);
            return EMPTY;
          }
      }
      ))
    }
    return of(new Patient());
  }
}
