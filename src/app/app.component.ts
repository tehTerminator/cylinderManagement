import { Component } from '@angular/core';
import { AuthApiService } from './auth/auth-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cylinderManagement';

  constructor(private auth: AuthApiService) {
    this.auth.init();
  }
}
