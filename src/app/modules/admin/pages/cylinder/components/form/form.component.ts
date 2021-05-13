import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Cylinder } from '../../../../../../shared/collection';
import { SnackBarService } from '../../../../../../shared/snack-bar.service';
import { CylinderService } from './../../../../../../shared/cylinder.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  loading = false;

  constructor(
    private fb: FormBuilder,
    private store: CylinderService,
    private snackBar: SnackBarService
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: ['', Validators.required, this.cylinderNameValidator.bind(this)],
      capacity: [0, Validators.required]
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
        this.loading = false;
        this.myForm.reset();
      },
      (error) => this.snackBar.show(error)
    );
  }

  get title(): FormControl {
    return this.myForm.get('title') as FormControl;
  }
  get capacity(): FormControl {
    return this.myForm.get('capacity') as FormControl;
  }

  private cylinderNameValidator(control: FormControl): Promise<ValidationErrors | null> {
    const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
      const title = (control.value as string).toLowerCase();
      const list = this.store.getAsList() as Cylinder[];
      const item = list.find( x => x.title.toLowerCase() === title );
      if (!!item) {
        const error: ValidationErrors = { duplicate: true };
        resolve(error);
      }
    });
    return promise;
  }

}
