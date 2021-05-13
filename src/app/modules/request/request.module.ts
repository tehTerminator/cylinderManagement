import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { NewRequestComponent } from './pages/new-request/new-request.component';
import { ProcessRequestComponent } from './pages/process-request/process-request.component';
import { ListPatientComponent } from './pages/list-patient/list-patient.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UtilitiesModule } from './../../shared/utilities/utilities.module';
import { ListRequestsComponent } from './pages/list-requests/list-requests.component';
import { ListOldRequestComponent } from './components/list-old-request/list-old-request.component';


@NgModule({
  declarations: [
    NewRequestComponent,
    ProcessRequestComponent,
    ListPatientComponent,
    ListRequestsComponent,
    ListOldRequestComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    ReactiveFormsModule,
    UtilitiesModule,
    FormsModule
  ]
})
export class RequestModule { }
