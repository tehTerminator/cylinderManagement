import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cylinder, OxygenRequest, Patient } from '../../../../shared/collection';
import { RequestService } from '../../../../shared/request.service';
import { SnackBarService } from '../../../../shared/snack-bar.service';
import { PatientStoreService } from './../../../../shared/patient-store.service';
import { CylinderService } from './../../../../shared/cylinder.service';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-process-request',
  templateUrl: './process-request.component.html',
  styleUrls: ['./process-request.component.scss']
})
export class ProcessRequestComponent implements OnInit {
  oxygenRequest: OxygenRequest | null = null;
  patient: Patient | null = null;
  previousRequests: OxygenRequest[] = [];
  cylinder: FormControl = new FormControl(0, Validators.required);
  loading = false;

  constructor(
    private reqService: RequestService,
    private patientStore: PatientStoreService,
    private router: Router,
    private snackBar: SnackBarService,
    private cylinderService: CylinderService
  ) { }

  ngOnInit(): void {
    this.patientStore.init();
    this.cylinderService.init();

    if (!!this.reqService.selectedReq) {
      this.oxygenRequest = Object.assign({}, this.reqService.selectedReq);
      this.fetchPreviousRequests();
      try {
        this.patient = this.patientStore
          .getElementById(this.oxygenRequest.patient_id) as Patient;
      } catch (e) {
        this.snackBar.show('Invalid Patient ID');
        this.router.navigate(['/request', 'list']);
      }
    } else {
      this.snackBar.show('Please Select Active Request');
      this.router.navigate(['/request', 'list']);
    }
  }

  private fetchPreviousRequests(): void {
    this.reqService.fetchForPatient(this.patientId)
      .subscribe(
        (data => this.previousRequests = data),
        (error => this.snackBar.show(error))
      );
  }

  onSubmit(state: string): void {
    if (this.cylinder.value <= 0) {
      this.snackBar.show('Please Select A Cylinder Type');
      return;
    }

    const really = confirm('Do You With to ' + state + ' request');

    if (!really) {
      return;
    }

    this.reqService.changeState(this.id, state, this.cylinder.value)
    .subscribe(
      () => {this.navigateToList(); this.loading = false; },
        error => {
          this.snackBar.show('Unable to Process Request');
          console.error(error);
          this.loading = false;
        }
    );
  }

  private navigateToList(): void {
    this.router.navigate(['/request', 'list']);
    this.snackBar.show('Request Processed Successfully');
  }

  get id(): number{
    if (!!this.oxygenRequest) {
      return this.oxygenRequest.id;
    }
    return 0;
  }

  get patientId(): number {
    if (!!this.oxygenRequest) {
      return this.oxygenRequest.patient_id;
    }
    return 0;
  }

  get cylinderTypes(): Observable<Cylinder[]> {
    return this.cylinderService.getAsObservable() as Observable<Cylinder[]>;
  }

}
