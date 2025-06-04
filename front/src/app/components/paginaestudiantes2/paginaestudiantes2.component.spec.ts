import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paginaestudiantes2Component } from './paginaestudiantes2.component';

describe('Paginaestudiantes2Component', () => {
  let component: Paginaestudiantes2Component;
  let fixture: ComponentFixture<Paginaestudiantes2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paginaestudiantes2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paginaestudiantes2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
