import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';
import { CreateWardFormComponent } from './components/create-ward-form/create-ward-form.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'create-user', component: CreateUserFormComponent },
  { path: 'create-ward', component: CreateWardFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
