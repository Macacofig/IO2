import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MateriaService  {
  private materiaSubject = new BehaviorSubject<string>(''); // estado inicial vacío
  materiaSeleccionada$ = this.materiaSubject.asObservable();

  setMateria(materia: string) {
    this.materiaSubject.next(materia);
  }

  getMateria(): string {
    return this.materiaSubject.getValue();
  }
}
