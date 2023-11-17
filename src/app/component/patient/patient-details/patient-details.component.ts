import {Component, OnInit} from '@angular/core';
import {IPatient} from "../../../model/patient.model";
import {ActivatedRoute} from "@angular/router";
import {PatientDetailsModalComponent} from "../patient-details-modal/patient-details-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PatientService} from "../../../service/patient.service";
import {NoteService} from "../../../service/note.service";
import {INote} from "../../../model/note.model";
import {NoteModalComponent} from "../note-modal/note-modal.component";
import {Risque} from "../../../enum/risque";
import {RisqueService} from "../../../service/risque.service";

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.component.html',
  styleUrls: ['./patient-details.component.scss']
})
export class PatientDetailsComponent implements OnInit{

  patient?: IPatient;
  risqueStatut?: Risque | null;
  notes?: INote[] | null = [];

  constructor(private activatedRoute: ActivatedRoute,
              private modalService: NgbModal,
              private patientService: PatientService,
              private noteService: NoteService,
              private risqueService: RisqueService) {

    this.activatedRoute.data.subscribe((passed: any ) => {
      this.patient = passed.patient;
    });

    this.loadNotes();

    // @ts-ignore
    this.risqueService.getPatientRisqueStatus(this.patient?.id).subscribe(
      (risque: any) => {
        this.risqueStatut = risque.body;
      },
      error => {
        console.error('Error occurred:', error);
      }
    )

  }

  ngOnInit(): void {

  }

  previousState(): void {
    window.history.back();
  }

  updatePatient(){
    const addPatientModal = this.modalService.open(PatientDetailsModalComponent, { size: 'lg', backdrop: 'static' } )
    addPatientModal.componentInstance.patient = this.patient;
    addPatientModal.componentInstance.title = "Update Patient : " + this.patient?.nom + ' ' + this.patient?.prenom;

    addPatientModal.componentInstance.passEntry
      .subscribe((receivedPatient:IPatient) => {
        this.patientService.createOrUpdatePatient(receivedPatient).subscribe({
        });
      })
  }

  addNote(){
    const addNoteModal = this.modalService.open(NoteModalComponent, { size: 'lg', backdrop: 'static' } )
    addNoteModal.componentInstance.patient = this.patient;
    addNoteModal.componentInstance.title = "Add new Note ";

    addNoteModal.componentInstance.passEntry.subscribe((recievedNote: any) => {
      if(recievedNote){
        const note = {
          patientId : this.patient?.id,
          patientName : this.patient?.nom + ' ' + this.patient?.prenom,
          note: recievedNote,
          dateNote: Date.now()
        }
        this.noteService.createOrUpdateNote(note).subscribe({
          next: (response) => this.loadNotes(),
          error: err => console.log(err)
        })
      }
    });

  }

  updateNote(note: INote){
    const addNoteModal = this.modalService.open(NoteModalComponent, { size: 'lg', backdrop: 'static' } )
    addNoteModal.componentInstance.patient = this.patient;
    addNoteModal.componentInstance.note = note;
    addNoteModal.componentInstance.title = "Update Note ";

    addNoteModal.componentInstance.passEntry.subscribe((recievedNote: any) => {
      if(recievedNote){
        const updatednote = {
          id: note.id,
          patientId : this.patient?.id,
          patientName : this.patient?.nom + ' ' + this.patient?.prenom,
          note: recievedNote,
          dateNote: Date.now()
        }
        note.note = recievedNote;
        this.noteService.createOrUpdateNote(note).subscribe({
          next: (response) => this.loadNotes(),
          error: err => console.log(err)
        })
      }
    });

  }


  loadNotes() {
    // @ts-ignore
    this.noteService.findAllNotesByPatientId(this.patient?.id).subscribe(
      {

        next: (response) => {
          // @ts-ignore
          this.notes = response.body
        },
        error: err => console.log(err)
      }
    );
  }


  // @ts-ignore
  getStatutClass(risque: Risque | null | undefined) : string {
    switch (risque) {
      case Risque.NONE:{
        return 'success';
      }
      case Risque.BORDERLINE:{
        return 'warning';
      }
      case Risque.IN_DANGER:{
        return 'danger';
      }
      case Risque.EARLY_ONSET:{
        return 'dark';
      }
    }
  }


}
