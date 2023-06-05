import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoomsPageComponent } from './admin-rooms-page.component';

describe('AdminRoomsPageComponent', () => {
  let component: AdminRoomsPageComponent;
  let fixture: ComponentFixture<AdminRoomsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRoomsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRoomsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
