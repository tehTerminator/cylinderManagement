import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OxygenRequest, Patient } from '../../../../shared/collection';
import { PatientStoreService } from '../../../../shared/patient-store.service';
import { SnackBarService } from '../../../../shared/snack-bar.service';
import { RequestService } from './../../../../shared/request.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss']
})
export class NewRequestComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  patient: null | Patient = null;
  oldRequests: OxygenRequest[] = [];
  loading = false;

  constructor(
    private fb: FormBuilder,
    private request: RequestService,
    private patientStore: PatientStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      patient_id: [0, Validators.required],
      ward_id: [0, Validators.required],
      bed_number: [0, Validators.required],
      spo2_level: [0, Validators.required],
      comment: ''
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id === undefined || id === null) {
      this.snackBar.show('Patient Id Invalid');
      this.router.navigate(['/request', 'patient']);
    } else {
      this.fillData(+id);
    }
  }

  private fillData(id: number): void {
    try {
      this.patient = this.patientStore.getElementById(id) as Patient;
      this.myForm.patchValue({
        patient_id: this.patient.id,
        ward_id: this.patient.ward_id,
        bed_number: this.patient.bed_number,
      });

      this.request.fetchForPatient(id)
        .subscribe(
          (oxygenRequests => this.oldRequests = oxygenRequests),
          (error) => this.snackBar.show(error)
        );
    } catch (e) {
      this.snackBar.show(e);
      this.router.navigate(['/request', 'patient']);
    }
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.snackBar.show('Invalid Form Data');
      return;
    }

    this.loading = true;

    this.request.create(this.myForm.value)
      .subscribe(
        (oxygenRequest) => {
          this.snackBar.show(
            'Request Created Successfully. #' + oxygenRequest.id
          );
          this.oldRequests.unshift(oxygenRequest);
          this.loading = false;
        },
        (error) => { this.snackBar.show(error); this.loading = false; }
      );
  }
}
