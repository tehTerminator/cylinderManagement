import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'create-user', component: CreateUserFormComponent },
  { path: 'ward', loadChildren: () => import('./pages/ward/ward.module').then(m => m.WardModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
