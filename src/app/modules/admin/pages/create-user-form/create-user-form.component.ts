import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../../shared/api.service';
import { SnackBarService } from '../../../../shared/snack-bar.service';

@Component({
  selector: 'app-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss']
})
export class CreateUserFormComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  loading = false;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snackBar: SnackBarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.maxLength(100)
      ]],
      username: ['',
        [
          Validators.required,
          Validators.maxLength(50),
        ],
        this.usernameValidator.bind(this)
      ],
      password: ['', Validators.required],
      mobile: ['', [
        Validators.required,
        Validators.pattern('^[6-9]{1}[0-9]{9}$'),
      ]],
      designation: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern('^[a-zA-Z ]+$')
      ]]
    });
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.snackBar.show('Please Enter Valid Information');
      return;
    }

    this.loading = true;

    this.api.create(['user'], this.myForm.value)
    .subscribe(
      () => {
        this.snackBar.show('User Created Successfully');
        const payload = {
          title: this.title.value,
          username: this.username.value,
          password: this.password.value
        };
        this.router.navigate(['/admin', 'preview'], {queryParams: payload});
      },
      (error) => {
        this.loading = false;
        console.error(error);
        this.snackBar.show('Unable to Create User');
      }
    );
  }

  generateUserName(): void{
    const name = this.title.value;
    const username = name.replace(/ /g, '').toLowerCase() + this.genRandomNumber(1000);
    this.myForm.patchValue({
      username
    });
  }

  generatePassword(): void {
    let password = this.username.value as string;
    password = password.substr(0, 3) + '@' + this.genRandomNumber(1000);
    password = password[0].toUpperCase() + password.substr(1);
    this.myForm.patchValue({
      password
    });
  }

  genRandomNumber(len: number): number {
    return Math.floor(Math.random() * len);
  }

  get title(): FormControl {
    return this.myForm.get('title') as FormControl;
  }

  get username(): FormControl {
    return this.myForm.get('username') as FormControl;
  }

  get password(): FormControl {
    return this.myForm.get('password') as FormControl;
  }

  get mobile(): FormControl {
    return this.myForm.get('mobile') as FormControl;
  }

  get designation(): FormControl {
    return this.myForm.get('designation') as FormControl;
  }


  private usernameValidator(control: FormControl): Promise<ValidationErrors | null> {
    const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
      const username = control.value;
      this.api.select<{ count: number }>(['username'], { username })
        .subscribe(
          (response) => {
            if (response.count > 0) {
              const error: ValidationErrors = { duplicate: true };
              resolve(error);
            }
            resolve(null);
          },
          (error) => {
            resolve(null);
          }
        );
    });
    return promise;
  }
}
