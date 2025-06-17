import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriaService  {
  // private materiaSubject = new BehaviorSubject<string>(''); // estado inicial vacío
  private materiaSubject = new BehaviorSubject<string>(localStorage.getItem('materia') || '');
  materiaSeleccionada$ = this.materiaSubject.asObservable();

  setMateria(materia: string) {
    localStorage.setItem('materia', materia);
    this.materiaSubject.next(materia);
  }

  getMateria(): string {
    return this.materiaSubject.getValue();
  }
}
