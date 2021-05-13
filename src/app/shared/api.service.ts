import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, ObservableInput } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public select<Type>(url: string[], payload?: { [key: string]: string }, method = 'GET'): Observable<Type> {
    const serverUrl = this.createUrl('select', url);
    console.log('Select Method ', method);
    let request: any = null;
    if (method === 'POST') {
      console.log('Post SELECT');
      request = this.http.post<Type>(serverUrl, payload);
    } else {
      request = this.http.get<Type>(serverUrl, { params: payload });
    }

    return request.pipe(
      catchError(error => this.handleError(error))
    );
  }

  create<Type>(url: string[], payload: { [key: string]: any }): Observable<Type> {
    const serverUrl = this.createUrl('create', url);
    return this.http.post<Type>(serverUrl, payload);
  }

  update<Type>(url: string[], payload: { [key: string]: any }): Observable<Type> {
    const serverUrl = this.createUrl('update', url);
    return this.http.put<Type>(serverUrl, payload);
  }

  delete(url: string[]): Observable<GeneralReponse> {
    const serverUrl = this.createUrl('delete', url);
    return this.http.delete<GeneralReponse>(serverUrl);
  }

  private createUrl(prefix: string, url: string[]): string {
    const trail = [prefix, ...url].join('/');
    return `${environment.apiBaseUrl}/${trail}`;
  }

  private handleError(error: any): ObservableInput<any> {
    console.error(error);
    if (typeof (error.error) === 'string') {
      throw new Error(error.error);
    }
    throw new Error('Unable to Create New Request');
  }
}

export interface GeneralReponse {
  message: string;
}
