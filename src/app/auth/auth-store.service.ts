import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserData } from '../shared/collection';
import { User } from './user.model';
import { HOUR } from './../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private _loggedIn = false;
  public user = new BehaviorSubject<User>(this.generateAnonymousUser());

  constructor() { }

  generateAnonymousUser(): User {
    return new User(0, 'Anonymous', 0, 0, false, '', '', 0);
  }

  get loggedIn(): boolean {
    return this._loggedIn;
  }

  signIn(userData: UserData): void {
    const expirationTime = (new Date(userData.updated_at)).getTime() + HOUR;
    const newUser = new User(
      userData.id,
      userData.title,
      userData.is_admin,
      userData.mobile,
      userData.token,
      expirationTime
    );
    this.user.next(newUser);
    this._loggedIn = true;
  }

  signOut(): void {
    this.user.next(this.generateAnonymousUser());
    this._loggedIn = false;
  }
}
