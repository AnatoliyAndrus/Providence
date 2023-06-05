import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHotelsPageComponent } from './admin-hotels-page.component';

describe('AdminHotelsPageComponent', () => {
  let component: AdminHotelsPageComponent;
  let fixture: ComponentFixture<AdminHotelsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminHotelsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHotelsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
