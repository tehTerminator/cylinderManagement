import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBedsFormComponent } from './create-beds-form.component';

describe('CreateBedsFormComponent', () => {
  let component: CreateBedsFormComponent;
  let fixture: ComponentFixture<CreateBedsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBedsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBedsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
