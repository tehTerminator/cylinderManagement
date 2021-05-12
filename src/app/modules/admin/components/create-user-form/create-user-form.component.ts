import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './../../../../shared/api.service';
import { SnackBarService } from './../../../../shared/snack-bar.service';

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
    private snackBar: SnackBarService
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
          Validators.maxLength(50)
        ]],
      password: ['', Validators.required],
      mobile: ['', [
        Validators.required,
        Validators.pattern('^[6-9]{1}[0-9]{9}$'),
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
        this.myForm.reset();
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        console.error(error);
        this.snackBar.show('Unable to Create User');
      }
    );
  }

}
