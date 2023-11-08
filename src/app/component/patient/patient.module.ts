import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { PatientsComponent } from './patients.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {RouterLink, RouterOutlet} from "@angular/router";
import {NgbPagination} from "@ng-bootstrap/ng-bootstrap";
import {PatientDetailsModalComponent} from "./patient-details-modal/patient-details-modal.component";
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import {PatientRoutingModule} from "./patient-routing.module";
import { PatientsListComponent } from './patients-list/patients-list.component';
import { NoteModalComponent } from './note-modal/note-modal.component';



@NgModule({
  declarations: [
    PatientsComponent,
    PatientDetailsModalComponent,
    PatientDetailsComponent,
    PatientsListComponent,
    NoteModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterLink,
    NgbPagination,
    RouterOutlet,
    FormsModule,
    PatientRoutingModule,
    NgOptimizedImage
  ]
})
export class PatientModule { }
