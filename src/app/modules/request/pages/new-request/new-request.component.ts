import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from './../../../../shared/api.service';
import { SnackBarService } from './../../../../shared/snack-bar.service';
import { PatientStoreService } from './../../../../shared/patient-store.service';
import { WardStoreService } from './../../../../shared/ward-store.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private snackBar: SnackBarService,
    private patientStore: PatientStoreService,
    private wardStore: WardStoreService
  ) { }

  ngOnInit(): void {
    this.patientStore.init();
    this.
  }
}
