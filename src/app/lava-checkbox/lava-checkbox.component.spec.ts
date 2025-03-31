import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LavaCheckboxComponent } from './lava-checkbox.component';

describe('LavaCheckboxComponent', () => {
  let component: LavaCheckboxComponent;
  let fixture: ComponentFixture<LavaCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LavaCheckboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LavaCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
