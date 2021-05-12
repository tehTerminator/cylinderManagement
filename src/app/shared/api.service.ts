import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public select<Type>(url: string[], payload: {[key: string]: string}, method = 'GET'): Observable<Type> {
    const serverUrl = this.createUrl('select', url);
    if (method === 'POST') {
      return this.http.post<Type>(serverUrl, payload);
    }
    return this.http.get<Type>(serverUrl, {params: payload});
  }

  create<Type>(url: string[], payload: {[key: string]: any}): Observable<Type>{
    const serverUrl = this.createUrl('create', url);
    return this.http.put<Type>(serverUrl, payload);
  }

  update<Type>(url: string[], payload: {[key: string]: any}): Observable<Type> {
    const serverUrl = this.createUrl('update', url);
    return this.http.post<Type>(serverUrl, payload);
  }

  delete(url: string[]): Observable<GeneralReponse> {
    const serverUrl = this.createUrl('delete', url);
    return this.http.delete<GeneralReponse>(serverUrl);
  }

  private createUrl(prefix: string, url: string[]): string {
    const trail = [prefix, ...url].join('/');
    return `${environment.apiBaseUrl}/${trail}`;
  }
}

export interface GeneralReponse {
  message: string;
}
