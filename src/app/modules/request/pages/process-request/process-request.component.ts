import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OxygenRequest, Patient } from '../../../../shared/collection';
import { RequestService } from '../../../../shared/request.service';
import { SnackBarService } from '../../../../shared/snack-bar.service';
import { PatientStoreService } from './../../../../shared/patient-store.service';

@Component({
  selector: 'app-process-request',
  templateUrl: './process-request.component.html',
  styleUrls: ['./process-request.component.scss']
})
export class ProcessRequestComponent implements OnInit {
  oxygenRequest: OxygenRequest | null = null;
  patient: Patient | null = null;
  previousRequests: OxygenRequest[] = [];

  constructor(
    private reqService: RequestService,
    private patientStore: PatientStoreService,
    private router: Router,
    private snackBar: SnackBarService,
  ) { }

  ngOnInit(): void {
    this.patientStore.init();

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

  approveRequest(): void {
    this.reqService.changeState(this.id, 'APPROVED')
      .subscribe(
        () => this.navigateToList(),
        error => {
          this.snackBar.show('Unable to Approve Request');
          console.error(error);
        }
      );
  }

  rejectRequest(): void {
    this.reqService.changeState(this.id, 'REJECTED')
      .subscribe(
        () => this.navigateToList(),
        error => {
          this.snackBar.show('Unable to Reject Request');
          console.error(error);
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

}
