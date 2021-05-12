import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WardRoutingModule } from './ward-routing.module';
import { WardComponent } from './ward.component';
import { CreateWardFormComponent } from './components/create-ward-form/create-ward-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    WardComponent,
    CreateWardFormComponent
  ],
  imports: [
    CommonModule,
    WardRoutingModule,
    ReactiveFormsModule
  ]
})
export class WardModule { }
