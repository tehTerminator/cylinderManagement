import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { BaseService } from './base-service';
import { BasicItem, Cylinder } from './collection';
import { HOUR } from './constants';
import { SnackBarService } from './snack-bar.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CylinderService extends BaseService {

  protected fetch(): void {
    this.api.select<Cylinder[]>(['cylinders'])
    .subscribe(
      (data => this.store(data)),
      () => this.snackBar.show('Unable to Fetch Cylinder Information')
    );
  }
  public create(data: any): Observable<Cylinder> {
    return this.api.create<Cylinder>(['cylinder'], data)
    .pipe(
      tap(cylinder => this.insert(cylinder)),
      catchError(
        error => {
          console.error(error);
          throw new Error('Unable to Create New Cylinder type');
        }
      )
    );
  }
  public update(data: BasicItem): Observable<BasicItem> {
    throw new Error('Method not implemented.');
  }
  public delete(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

  constructor(private api: ApiService, private snackBar: SnackBarService) {
    super('cylinders', HOUR);
  }
}
