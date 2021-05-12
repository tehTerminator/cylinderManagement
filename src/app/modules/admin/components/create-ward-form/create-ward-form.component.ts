import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from '../../../../shared/snack-bar.service';
import { WardStoreService } from './../../../../shared/ward-store.service';

@Component({
  selector: 'app-create-ward-form',
  templateUrl: './create-ward-form.component.html',
  styleUrls: ['./create-ward-form.component.scss']
})
export class CreateWardFormComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  loading = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: SnackBarService,
    private store: WardStoreService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: ['', Validators.required],
      bedCount: [0, [Validators.required, Validators.min(1)]],
      bedsWithOxygen: [0, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      this.snackBar.show('Invalid Form Data');
      return;
    }

    this.loading = true;

    this.store.create(this.myForm.value)
    .subscribe(
      () => {
        this.snackBar.show('Ward Created Successfully');
        this.myForm.reset();
      },
      (error) => this.snackBar.show(error)
    );
  }

}
