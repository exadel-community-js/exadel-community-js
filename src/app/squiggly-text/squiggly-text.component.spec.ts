import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquigglyTextComponent } from './squiggly-text.component';

describe('SquigglyTextComponent', () => {
  let component: SquigglyTextComponent;
  let fixture: ComponentFixture<SquigglyTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquigglyTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SquigglyTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
