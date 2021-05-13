import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '../../../../shared/collection';
import { PatientStoreService } from '../../../../shared/patient-store.service';
import { SnackBarService } from '../../../../shared/snack-bar.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss']
})
export class ViewPatientComponent implements OnInit {
  patient: Patient | null = null;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackBarService,
    private patientStore: PatientStoreService) { }

  ngOnInit(): void {
    this.patientStore.init();
    const id = this.route.snapshot.paramMap.get('id');

    if (id === undefined || id === null) {
      this.router.navigate(['/patients', 'list']);
      return;
    }

    this.viewPatient(+id);
  }

  private viewPatient(id: number): void {
    try{
      this.patient = this.patientStore.getElementById(id) as Patient;
    } catch (e) {
      this.snackBar.show('Patient Not Found');
      this.router.navigate(['/patient', 'list']);
    }
  }

  discharge(): void {
    this.loading = true;
    if (!!this.patient) {
      const confirmMessage = 'Do You Want to Discharge ' + this.patient.title;
      const reallyDelete = confirm(confirmMessage);

      if (!reallyDelete) {
        this.loading = false;
        return;
      }

      this.patientStore.discharge(this.patient.id)
      .subscribe(
        (() => {
          this.snackBar.show('Patient Discharged Successfully');
          this.router.navigate(['/patient', 'list']);
        }),
        (() => {
          this.loading = false;
          this.snackBar.show('Unable to Discharge Patient');
        })
      );
    }
  }
}
