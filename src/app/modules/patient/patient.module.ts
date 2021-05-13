import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { CreateNewComponent } from './pages/create-new/create-new.component';
import { ViewPatientComponent } from './pages/view-patient/view-patient.component';
import { ListPatientComponent } from './pages/list-patient/list-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilitiesModule } from '../../shared/utilities/utilities.module';


@NgModule({
  declarations: [
    CreateNewComponent,
    ViewPatientComponent,
    ListPatientComponent
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ReactiveFormsModule,
    UtilitiesModule,
    FormsModule
  ]
})
export class PatientModule { }
