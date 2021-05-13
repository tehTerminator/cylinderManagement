import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BaseService } from './base-service';
import { BasicItem, Patient } from './collection';
import { SnackBarService } from './snack-bar.service';
import { MINUTE } from './constants';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientStoreService extends BaseService {

  constructor(private api: ApiService, private snackBar: SnackBarService) {
    super('patients', MINUTE * 10);
  }

  protected fetch(): void {
    this.api.select<Patient[]>(['patients'])
      .subscribe(
        (patients => this.store(patients)),
        (error => {
          this.snackBar.show('Unable to Fetch Patients');
          console.error(error);
        })
      );
  }
  public create(payload: Patient): Observable<Patient> {
    return this.api.create<Patient>(['patient'], payload)
      .pipe(
        tap(
          patient => this.insert(patient)
        ),
        catchError(
          error => {
            console.error(error);
            if (typeof(error.error) === 'string'){
              throw new Error(error.error);
            }
            throw new Error('Unable to Create New Patient, Please Check Log');
          }
        )
      );
  }
  public update(payload: any): Observable<Patient> {
    return this.api.update<Patient>(['patient'], payload)
      .pipe(
        tap(patient => this.updateItem(patient)),
        catchError(error => {
          console.error(error);
          throw new Error('Unable to Update Patient Information');
        })
      );
  }

  public discharge(id: number): Observable<Patient> {
    const list = this.getAsList();
    const index = list.findIndex(x => x.id === id);
    console.log(index);
    return this.api.update<Patient>(['patient', 'discharge'], {id})
    .pipe(
      tap(patient => this.deleteItem(index)),
      catchError(error => {
        console.error(error);
        throw new Error('Unable to Update Patient Information');
      })
    );
  }

  public delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

}
