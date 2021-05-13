import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Ward } from '../../../../../../shared/collection';
import { SnackBarService } from '../../../../../../shared/snack-bar.service';
import { WardStoreService } from '../../../../../../shared/ward-store.service';

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
      title: ['', Validators.required, this.wardNameValidator.bind(this)],
      capacity: [1, [Validators.required, Validators.min(1)]],
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

  private wardNameValidator(control: FormControl): Promise<ValidationErrors | null> {
    const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
      const title = (control.value as string).toLowerCase();
      const list = this.store.getAsList() as Ward[];
      const item = list.find( x => x.title.toLowerCase() === title );
      if (!!item) {
        const error: ValidationErrors = { duplicate: true };
        resolve(error);
      }
    });
    return promise;
  }

  get title(): FormControl {
    return this.myForm.get('title') as FormControl;
  }
  get capacity(): FormControl {
    return this.myForm.get('capacity') as FormControl;
  }

}
