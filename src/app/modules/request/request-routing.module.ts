import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListPatientComponent } from './pages/list-patient/list-patient.component';
import { ListRequestsComponent } from './pages/list-requests/list-requests.component';
import { NewRequestComponent } from './pages/new-request/new-request.component';
import { ProcessRequestComponent } from './pages/process-request/process-request.component';

const routes: Routes = [
  { path: 'patient', component: ListPatientComponent },
  { path: 'patient/:id/new', component: NewRequestComponent },
  { path: 'list', component: ListRequestsComponent },
  { path: ':id', component: ProcessRequestComponent },
  { path: '**', redirectTo: 'new', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
