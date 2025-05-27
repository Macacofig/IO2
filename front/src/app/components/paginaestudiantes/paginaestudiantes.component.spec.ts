import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaestudiantesComponent } from './paginaestudiantes.component';

describe('PaginaestudiantesComponent', () => {
  let component: PaginaestudiantesComponent;
  let fixture: ComponentFixture<PaginaestudiantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginaestudiantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginaestudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
