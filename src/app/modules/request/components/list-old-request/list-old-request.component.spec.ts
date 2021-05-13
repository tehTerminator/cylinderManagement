import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOldRequestComponent } from './list-old-request.component';

describe('ListOldRequestComponent', () => {
  let component: ListOldRequestComponent;
  let fixture: ComponentFixture<ListOldRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOldRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOldRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
