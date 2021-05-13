import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from './../../shared/snack-bar.service';
import { AuthApiService } from './../../auth/auth-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  signInForm: FormGroup = new FormGroup({});
  loading = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    private auth: AuthApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.signInForm.invalid) {
      this.snackBar.show('Invalid Data in Form');
      return;
    }

    this.loading = true;

    this.auth.signIn(this.username.value, this.password.value)
    .subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['/home']);
      },
      (error) => {
        this.loading = false;
        this.snackBar.show(error);
      }
    );
  }

  get username(): FormControl {
    return this.signInForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.signInForm.get('password') as FormControl;
  }
}
