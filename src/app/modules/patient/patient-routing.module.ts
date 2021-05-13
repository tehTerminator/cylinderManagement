import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateNewComponent } from './pages/create-new/create-new.component';
import { ListPatientComponent } from './pages/list-patient/list-patient.component';
import { ViewPatientComponent } from './pages/view-patient/view-patient.component';

const routes: Routes = [
  { path: 'create', component: CreateNewComponent },
  { path: 'list', component: ListPatientComponent },
  { path: 'view/:id', component: ViewPatientComponent },
  { path: '**', redirectTo: 'create', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }
