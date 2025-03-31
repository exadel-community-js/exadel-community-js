import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetTheCatComponent } from './pet-the-cat.component';

describe('PetTheCatComponent', () => {
  let component: PetTheCatComponent;
  let fixture: ComponentFixture<PetTheCatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetTheCatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PetTheCatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
