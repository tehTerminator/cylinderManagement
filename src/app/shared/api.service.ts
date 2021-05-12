import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public select<Type>(url: string|string[], payload: {[key: string]: string}, method = 'GET'): Observable<Type> {
    const serverUrl = `select/${this.createUrl(url)}`;
    if (method === 'POST') {
      return this.http.post<Type>(serverUrl, payload);
    }
    return this.http.get<Type>(serverUrl, {params: payload});
  }

  create<Type>(url: string|string[], payload: {[key: string]: any}): Observable<Type>{
    return this.http.put<Type>(`create/${this.createUrl(url)}`, payload);
  }

  update<Type>(url: string|string[], payload: {[key: string]: any}): Observable<Type> {
    return this.http.post<Type>(`update/${this.createUrl(url)}`, payload);
  }

  delete(url: string|string[]): Observable<GeneralReponse> {
    return this.http.delete<GeneralReponse>(`delete/${this.createUrl(url)}`);
  }

  private createUrl(url: string | string[]): string {
    let trail = '';
    if (typeof(url) === 'string') {
      trail = url;
    } else {
      trail = url.join('/');
    }
    return `${environment.apiBaseUrl}/${trail}`;
  }
}

export interface GeneralReponse {
  message: string;
}
