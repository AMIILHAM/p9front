import {Component, OnDestroy, OnInit} from '@angular/core';
import {IPatient, Patient} from "../../../model/patient.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PatientService} from "../../../service/patient.service";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {ISearchPage} from "../../../model/search-page.model";
import {PatientDetailsModalComponent} from "../patient-details-modal/patient-details-modal.component";


@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit, OnDestroy{

  patientList?: IPatient[] | null;

  //PAGINATION
  totalItems: number = 0;
  totalResult = 0;
  itemsPerPage = 10;
  page?: number;
  predicate !: string;
  ascending!: boolean;
  ngbPaginationPage = 1;

  //FILTER
  searchForm: FormGroup = this.formBuilder.group({
    nom: [null],
    prenom: [null],
    adresse: [null],
    telephone: [null]
  });

  loadPageSubscription: Subscription = new Subscription();
  constructor(protected router:Router,
              private modalService: NgbModal,
              private formBuilder: FormBuilder,
              private patientService: PatientService)
  {}

  ngOnDestroy(): void {
    this.searchForm.reset();
    if (this.loadPageSubscription) {
      this.loadPageSubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(page?: number, dontNavigate?: boolean): void{
    const pageToLoad: number = page ?? this.page ?? 1;
    if (this.loadPageSubscription) {
      this.loadPageSubscription.unsubscribe();
    }
    if (this.searchForm.valid){
      const searchObject = {
        nom: this.fields['nom']?.value ?? '',
        prenom: this.fields['prenom']?.value ?? '',
        adresse: this.fields['adresse']?.value ?? '',
        telephone: this.fields['telephone']?.value ?? '',

        page: pageToLoad - 1,
        size: this.itemsPerPage,
        //sort: this.sort()
      };

      this.loadPageSubscription = this.patientService.getAllByCriteria(searchObject).subscribe({
        next: (res: HttpResponse<ISearchPage<IPatient[]>>) => {
          this.onSuccess(res.body, res.headers, pageToLoad, !dontNavigate);
          this.totalResult = +res.headers.get('X-Total-Count')!;
        },
        error: () => {
          this.onError();
        },
      });
    }

  }
  protected onSuccess(data: ISearchPage<IPatient[]> | null, headers: HttpHeaders, page: number, navigate: boolean): void {
    this.totalItems = data?.totalElements! ?? 0;
    this.page = page;
    if (navigate) {
      this.router.navigate(['/patients'], {
        queryParams: {
          page: this.page,
          size: this.itemsPerPage,
          sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc'),
        },
      });
    }

    this.patientList = data?.content;
    this.ngbPaginationPage = this.page;
  }
  trackId(index: number, item: IPatient): number {

    return item.id!;
  }
  viewDetails(item: IPatient){
    const viewModal = this.modalService.open(PatientDetailsModalComponent, { size: 'lg', backdrop: 'static' } )
    viewModal.componentInstance.patient = item;
    viewModal.componentInstance.title = "Patient Details";
  }
  addPatient(){
    const addPatientModal = this.modalService.open(PatientDetailsModalComponent, { size: 'lg', backdrop: 'static' } )
    addPatientModal.componentInstance.patient = new Patient();
    addPatientModal.componentInstance.title = "Ajout d'un Patient";

    addPatientModal.componentInstance.passEntry
      .subscribe((receivedPatient:IPatient) => {
        this.patientService.createOrUpdatePatient(receivedPatient).subscribe({
          next: (response) => console.log("Response :" + response)
        });
      })
  }
  updatePatient(patient: IPatient){
    const addPatientModal = this.modalService.open(PatientDetailsModalComponent, { size: 'lg', backdrop: 'static' } )
    addPatientModal.componentInstance.patient = patient;
    addPatientModal.componentInstance.title = "Update Patient : " + patient.nom + ' ' + patient.prenom;

    addPatientModal.componentInstance.passEntry
      .subscribe((receivedPatient:IPatient) => {
        this.patientService.createOrUpdatePatient(receivedPatient).subscribe({
          next: (response) => console.log("Response :" + response)
        });
        console.log(receivedPatient);
      })
  }

  onSearch(): void {
    this.ngbPaginationPage = 1;
    this.loadPage(this.ngbPaginationPage);
  }
  onRefreshSearch(): void {
    this.searchForm.reset()
    this.predicate = 'id';
    this.ascending = false;
    this.onSearch();
  }

  get fields() { return this.searchForm.controls; }
  protected onError(): void {
    this.ngbPaginationPage = this.page ?? 1;
  }
  protected sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

}
