import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWardFormComponent } from './create-ward-form.component';

describe('CreateWardFormComponent', () => {
  let component: CreateWardFormComponent;
  let fixture: ComponentFixture<CreateWardFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateWardFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
