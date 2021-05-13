import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Patient } from '../../../collection';

@Component({
  selector: 'app-patient-table',
  templateUrl: './patient-table.component.html',
  styleUrls: ['./patient-table.component.scss']
})
export class PatientTableComponent implements OnChanges {
  @Input() patient: null | Patient = null;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    const patient = changes.patient;

    if (patient.currentValue !== patient.previousValue) {
      this.patient = patient.currentValue as Patient;
    }
  }
}
