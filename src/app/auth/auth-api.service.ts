import { Injectable } from '@angular/core';
import { UserData } from '../shared/collection';
import { AuthStoreService } from './auth-store.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {

  constructor(
    private api: ApiService,
    private store: AuthStoreService
  ) { }

  signIn(username: string, password: string): Observable<UserData> {
    return this.api.select<UserData>('user', {username, password}, 'POST')
    .pipe(
      tap(userData => {
        this.store.signIn(userData);
      }),
      catchError(
        error => {
          console.error(error);
          throw new Error('Invalid Username or Password');
        }
      )
    );
  }
}
