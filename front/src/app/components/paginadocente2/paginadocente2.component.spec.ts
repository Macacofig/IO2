import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paginadocente2Component } from './paginadocente2.component';

describe('Paginadocente2Component', () => {
  let component: Paginadocente2Component;
  let fixture: ComponentFixture<Paginadocente2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paginadocente2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paginadocente2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
