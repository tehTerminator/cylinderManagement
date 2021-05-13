import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CylinderRoutingModule } from './cylinder-routing.module';
import { CylinderComponent } from './cylinder.component';
import { FormComponent } from './components/form/form.component';
import { ListComponent } from './components/list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CylinderComponent,
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CylinderRoutingModule,
    ReactiveFormsModule
  ]
})
export class CylinderModule { }
