import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormelimparComponent } from './formelimpar.component';

describe('FormelimparComponent', () => {
  let component: FormelimparComponent;
  let fixture: ComponentFixture<FormelimparComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormelimparComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormelimparComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
