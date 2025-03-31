import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpDialsComponent } from './otp-dials.component';

describe('OtpDialsComponent', () => {
  let component: OtpDialsComponent;
  let fixture: ComponentFixture<OtpDialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpDialsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpDialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
