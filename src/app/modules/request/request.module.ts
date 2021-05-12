import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { NewRequestComponent } from './pages/new-request/new-request.component';
import { ProcessRequestComponent } from './pages/process-request/process-request.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    NewRequestComponent,
    ProcessRequestComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    ReactiveFormsModule
  ]
})
export class RequestModule { }
