import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMyBookingsPageComponent } from './user-my-bookings-page.component';

describe('UserMyBookingsPageComponent', () => {
  let component: UserMyBookingsPageComponent;
  let fixture: ComponentFixture<UserMyBookingsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserMyBookingsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserMyBookingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
