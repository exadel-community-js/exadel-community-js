import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundTheProjectComponent } from './fund-the-project.component';

describe('FundTheProjectComponent', () => {
  let component: FundTheProjectComponent;
  let fixture: ComponentFixture<FundTheProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FundTheProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundTheProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
