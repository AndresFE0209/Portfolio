import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvStackComponent } from './cv-stack.component';

describe('CvStackComponent', () => {
  let component: CvStackComponent;
  let fixture: ComponentFixture<CvStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvStackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
