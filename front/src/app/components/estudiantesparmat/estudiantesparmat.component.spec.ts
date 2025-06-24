import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesparmatComponent } from './estudiantesparmat.component';

describe('EstudiantesparmatComponent', () => {
  let component: EstudiantesparmatComponent;
  let fixture: ComponentFixture<EstudiantesparmatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstudiantesparmatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstudiantesparmatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
