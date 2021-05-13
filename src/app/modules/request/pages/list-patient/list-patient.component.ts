import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from '../../../../shared/collection';
import { PatientStoreService } from './../../../../shared/patient-store.service';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrls: ['./list-patient.component.scss']
})
export class ListPatientComponent implements OnInit {
  searchText = '';
  constructor(private patientStore: PatientStoreService) { }

  ngOnInit(): void {
    this.patientStore.init();
  }

  get patientList(): Observable<Patient[]> {
    return this.patientStore.getAsObservable() as Observable<Patient[]>;
  }

}
