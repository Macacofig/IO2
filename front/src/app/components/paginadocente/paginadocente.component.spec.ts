import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginadocenteComponent } from './paginadocente.component';

describe('PaginadocenteComponent', () => {
  let component: PaginadocenteComponent;
  let fixture: ComponentFixture<PaginadocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginadocenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginadocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
