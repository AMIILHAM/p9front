import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PatientsComponent} from "./patients.component";
import {Authority} from "../../enum/authority";
import {AuthGuard} from "../../core/auth/auth-guard";
import {PatientDetailsComponent} from "./patient-details/patient-details.component";
import {PatientsListComponent} from "./patients-list/patients-list.component";
import {PatientRoutingResolveService} from "../../service/patient-routing-resolve.service";


const routes: Routes = [
  {
    path: '',
    component: PatientsListComponent,
    data: { defaultSort: 'id,desc', allowedAuthorities: [Authority.USER]},
    canActivate: [AuthGuard]
  },
  {
    path: ':id/view',
    component: PatientDetailsComponent,
    resolve: {
      patient : PatientRoutingResolveService
    },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
