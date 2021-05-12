import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateWardFormComponent } from './components/create-ward-form/create-ward-form.component';


@NgModule({
  declarations: [
    AdminComponent,
    CreateUserFormComponent,
    CreateWardFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
