import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { WardListComponent } from './ward/components/ward-list/ward-list.component';
import { CreateBedsFormComponent } from './ward/components/create-beds-form/create-beds-form.component';
import { BedsListComponent } from './ward/components/beds-list/beds-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    CreateUserFormComponent,
    WardListComponent,
    CreateBedsFormComponent,
    BedsListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
