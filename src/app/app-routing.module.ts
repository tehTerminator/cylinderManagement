import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)
  },
  { path: 'request', canActivate: [AuthGuard], loadChildren: () => import('./modules/request/request.module').then(m => m.RequestModule) },
  { path: 'patient', canActivate: [AuthGuard], loadChildren: () => import('./modules/patient/patient.module').then(m => m.PatientModule) },
  { path: 'report', canActivate: [AuthGuard], loadChildren: () => import('./modules/report/report.module').then(m => m.ReportModule) },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
