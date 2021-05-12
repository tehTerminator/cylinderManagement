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
      ]],
      designation_id: [0, [Validators.required, Validators.min(1)]],
      department_id: [0, Validators.required, Validators.min(1)]
    });
  }

  onSubmit(): void {
    this.api.create(['user'], this.myForm.value)
    .subscribe(
      () => {
        this.snackBar.show('User Created Successfully');
        this.myForm.reset();
      },
      (error) => {
        console.error(error);
        this.snackBar.show('Unable to Create User');
      }
    );
  }

}
