import { Injectable, OnDestroy } from '@angular/core';
import { UserData } from '../shared/collection';
import { AuthStoreService } from './auth-store.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { HOUR } from '../shared/constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService implements OnDestroy {
  private timer: any = null;

  constructor(
    private api: ApiService,
    private store: AuthStoreService,
    private router: Router
  ) { }

  init(): void {
    const userData: UserData = this.getStoredUserData();
    const expirationTime = this.getStoredExpirationTime();
    const currentTime = (new Date()).getTime();

    if (expirationTime > currentTime && userData.id > 0) {
      this.handleAuthentication(userData);
    }
  }

  signIn(username: string, password: string): Observable<UserData> {
    return this.api.select<UserData>(['user'], { username, password }, 'POST')
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

  private handleAuthentication(userData: UserData): void {
    const expirationTime = (new Date(userData.updated_at)).getTime() + HOUR;
    this.setAutoSignOut(expirationTime);
    this.store.signIn(userData);
    this.storeInLocalStorage(userData, expirationTime);
  }

  private storeInLocalStorage(userData: UserData, expirationTime: number): void {
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('expirationTime', expirationTime.toString());
  }

  private getStoredUserData(): UserData {
    const ud = localStorage.getItem('userData');
    let userData: UserData = {
      id: 0,
      title: 'Anonymous',
      designation_id: 0,
      department_id: 0,
      is_admin: false,
      created_at: '',
      updated_at: '',
      mobile: '',
      token: ''
    };
    if (!!ud) {
      userData = JSON.parse(ud) as UserData;
    }
    return userData;
  }

  private getStoredExpirationTime(): number {
    let expirationTime = 0;
    const storedExpirationTime = localStorage.getItem('expirationTime');
    if (!!storedExpirationTime) {
      expirationTime = +storedExpirationTime;
    }
    return expirationTime;
  }

  private setAutoSignOut(expirationTime: number): void {
    const currentTime = (new Date()).getTime();
    const timeDiff = expirationTime - currentTime;
    if (timeDiff > 0) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.signOut();
      }, timeDiff);
    }
  }

  signOut(): void {
    this.store.signOut();
    localStorage.removeItem('userData');
    localStorage.removeItem('expirationTime');
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
