import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthStoreService } from '../../auth/auth-store.service';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {
  collapsed = true;
  user: User = this.userStore.generateAnonymousUser();
  private sub: Subscription = new Subscription();
  
  constructor(private userStore: AuthStoreService, private router: Router) { }

  ngOnInit(): void {
    this.sub = this.userStore.user.subscribe(
      (user => this.user = user)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  toggle(): void {
    this.collapsed = !this.collapsed;
  }

  signOut(): void {
    this.userStore.signOut();
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return this.userStore.loggedIn;
  }

  isAdmin(): boolean {
    return this.user.isAdmin;
  }
}
