import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../shared/api.service';
import { Patient, Ward } from '../../../../shared/collection';
import { PatientStoreService } from '../../../../shared/patient-store.service';
import { SnackBarService } from '../../../../shared/snack-bar.service';
import { WardStoreService } from '../../../../shared/ward-store.service';

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {
  myForm: FormGroup = new FormGroup({});
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: SnackBarService,
    private patientStore: PatientStoreService,
    private wardStore: WardStoreService,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.patientStore.init();
    this.wardStore.init();

    this.myForm = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.minLength(3)
      ]],
      father: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.minLength(3)
      ]],
      age: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(150),
        Validators.pattern('^[0-9]+$')]
      ],
      mobile: ['', [
        Validators.required, 
        Validators.pattern('^[6-9]{1}[0-9]{9}$')
      ]],
      narration: '',
      bed_number: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+$')],
        this.bedNumberValidator.bind(this)
      ],
      has_oxygen_line: false,
      ward_id: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      spo2_level: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  onSubmit(): void {
    if (this.myForm.invalid) {
      console.error(this.myForm.errors);
      this.snackBar.show('Invalid Form Data');
      return;
    }

    this.loading = true;

    const newPatient: Patient = {
      id: 0,
      title: this.title.value,
      father: this.father.value,
      age: this.age.value,
      mobile: this.mobile.value,
      narration: this.narration.value,
      bed_number: this.bed_number.value,
      has_oxygen_line: this.has_oxygen_line.value,
      ward_id: this.ward_id.value,
      date_of_discharge: '',
      ward: {
        id: 0,
        title: '',
        capacity: 0,
        created_at: '',
        updated_at: ''
      },
      created_at: '',
      updated_at: '',
      spo2_level: this.spo2_level.value
    };
    this.patientStore.create(newPatient)
      .subscribe(
        () => {
          this.snackBar.show('Patient Created Successfully');
          this.myForm.reset();
          this.loading = false;
        },
        (error) => {
          this.snackBar.show(error);
          this.loading = false;
        }
      );
  }

  get title(): FormControl {
    return this.myForm.get('title') as FormControl;
  }
  get father(): FormControl {
    return this.myForm.get('father') as FormControl;
  }
  get age(): FormControl {
    return this.myForm.get('age') as FormControl;
  }
  get mobile(): FormControl {
    return this.myForm.get('mobile') as FormControl;
  }
  get narration(): FormControl {
    return this.myForm.get('narration') as FormControl;
  }
  get bed_number(): FormControl {
    return this.myForm.get('bed_number') as FormControl;
  }
  get has_oxygen_line(): FormControl {
    return this.myForm.get('has_oxygen_line') as FormControl;
  }
  get ward_id(): FormControl {
    return this.myForm.get('ward_id') as FormControl;
  }
  get spo2_level(): FormControl {
    return this.myForm.get('spo2_level') as FormControl;
  }
  get wards(): Observable<Ward[]> {
    return this.wardStore.getAsObservable() as Observable<Ward[]>;
  }

  private bedNumberValidator(control: FormControl): Promise<ValidationErrors | null> {
    const promise = new Promise<ValidationErrors | null>((resolve, reject) => {
      const bedNumber = control.value;
      const wardNumber = this.ward_id.value;
      if (wardNumber <= 0) {
        resolve({ selectward: true });
      }
      this.api.select<{ count: number }>(['patient', 'validateBedNumber'], { bedNumber, wardNumber })
        .subscribe(
          (response) => {
            if (response.count > 0) {
              const error: ValidationErrors = { occupied: true };
              resolve(error);
            }
            resolve(null);
          },
          () => {
            resolve({occupied: true});
          }
        );
    });
    return promise;
  }
}
