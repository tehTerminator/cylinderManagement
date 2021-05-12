import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BaseService } from './base-service';
import { BasicItem, Ward } from './collection';
import { SnackBarService } from './snack-bar.service';
import { HOUR } from './constants';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WardStoreService extends BaseService {

  constructor(private api: ApiService, private snackBar: SnackBarService) {
    super('wards', HOUR);
  }

  protected fetch(): void {
    this.api.select<Ward[]>(['wards'])
    .subscribe(
      (wards => this.store(wards)),
      (error => {
        console.error(error);
        this.snackBar.show('Unable to Fetch Wards');
      })
    );
  }
  public create(payload: {[key: string]: any}): Observable<Ward> {
    return this.api.create<Ward>(['ward'], payload)
    .pipe(
      tap(
        ward => this.insert(ward)
      ),
      catchError(error => {
        console.error(error);
        throw new Error('Unable to Create New Ward');
      })
    );
  }
  public update(data: BasicItem): Observable<BasicItem> {
    throw new Error('Method not implemented.');
  }
  public delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }
}
