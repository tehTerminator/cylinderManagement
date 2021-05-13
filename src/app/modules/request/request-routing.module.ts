import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRequestComponent } from './pages/new-request/new-request.component';
import { ProcessRequestComponent } from './pages/process-request/process-request.component';

const routes: Routes = [
  { path: 'new', component: NewRequestComponent },
  { path: 'process', component: ProcessRequestComponent },
  { path: '**', redirectTo: 'new', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
