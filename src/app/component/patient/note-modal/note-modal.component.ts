import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {IPatient} from "../../../model/patient.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NoteService} from "../../../service/note.service";
import {INote, Note} from "../../../model/note.model";

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.scss']
})
export class NoteModalComponent implements OnInit{

  @Input() title?: string;
  @Input() patient?: IPatient;
  @Input() note?: INote;

  @Output() passEntry: EventEmitter<any> = new EventEmitter();


  noteForm : FormGroup = this.formBuilder.group({
    note: [null, Validators.required]
  })
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private noteService: NoteService) {}

  ngOnInit(): void {
    this.noteForm.patchValue({
      note: this.note?.note
    })
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirm(): void {
    this.passEntry.emit(this.fields['note']?.value ?? null);
    this.activeModal.close();
  }

  get fields() { return this.noteForm.controls; }
}
