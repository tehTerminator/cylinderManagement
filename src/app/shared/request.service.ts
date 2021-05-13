import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { OxygenRequest } from './collection';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private url = ['oxygen_request'];
  selectedReq: OxygenRequest | null = null;

  constructor(private api: ApiService) { }

  public create(payload: any): Observable<OxygenRequest> {
    return this.api.create<OxygenRequest>(this.url, payload);
  }

  /**
   *
   * @param id Request ID
   * @returns Observable<OxygenRequest>
   */
  public fetchOne(id: number): Observable<OxygenRequest> {
    return this.api.select<OxygenRequest>(this.url, {id: id.toString()});
  }

  public fetchPending(): Observable<OxygenRequest[]> {
    return this.api.select<OxygenRequest[]>([...this.url, 'pending']);
  }

  /**
   *
   * @param id Patient Id
   * @returns Observable<OxygenRequest[]> for Provided Patient id
   */
  public fetchForPatient(id: number): Observable<OxygenRequest[]> {
    return this.api.select<OxygenRequest[]>([...this.url, 'patient', id.toString()]);
  }

  public changeState(id: number, state: string): Observable<OxygenRequest> {
    return this.api.update<OxygenRequest>(this.url, {id, state});
  }
}
