import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CreateUserFormComponent } from './pages/create-user-form/create-user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PreviewComponent } from './pages/preview/preview.component';


@NgModule({
  declarations: [
    CreateUserFormComponent,
    PreviewComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
