import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {IPatient} from "../../../model/patient.model";

@Component({
  selector: 'app-patient-details-modal',
  templateUrl: './patient-details-modal.component.html',
  styleUrls: ['./patient-details-modal.component.scss']
})
export class PatientDetailsModalComponent {

  @Input() patient?: IPatient;
  @Input() title?: string;
  @Output() passEntry: EventEmitter<IPatient> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  submitObject(): void {
    this.passEntry.emit(this.patient);
    this.activeModal.close();
  }

}
