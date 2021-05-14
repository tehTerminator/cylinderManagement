import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserFormComponent } from './pages/create-user-form/create-user-form.component';
import { PreviewComponent } from './pages/preview/preview.component';

const routes: Routes = [
  { path: 'create-user', component: CreateUserFormComponent },
  { path: 'preview', component: PreviewComponent },
  { path: 'ward', loadChildren: () => import('./pages/ward/ward.module').then(m => m.WardModule) },
  { path: 'cylinder', loadChildren: () => import('./pages/cylinder/cylinder.module').then(m => m.CylinderModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
