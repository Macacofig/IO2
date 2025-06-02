import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormparaleloComponent } from './formparalelo.component';

describe('FormparaleloComponent', () => {
  let component: FormparaleloComponent;
  let fixture: ComponentFixture<FormparaleloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormparaleloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormparaleloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
