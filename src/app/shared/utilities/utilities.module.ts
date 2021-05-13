import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './search.pipe';
import { PatientTableComponent } from './components/patient-table/patient-table.component';



@NgModule({
  declarations: [SearchPipe, PatientTableComponent],
  imports: [
    CommonModule
  ],
  exports: [
    SearchPipe,
    PatientTableComponent
  ]
})
export class UtilitiesModule { }
