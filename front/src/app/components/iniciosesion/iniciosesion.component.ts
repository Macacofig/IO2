import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iniciosesion',
  imports: [],
  templateUrl: './iniciosesion.component.html',
  styleUrl: './iniciosesion.component.css'
})
export class IniciosesionComponent  {
  nombre: string = '';

  constructor(private router: Router) {}

  ingresar() {
    if (this.nombre.trim()) {
      console.log('Nombre ingresado:', this.nombre);
      this.router.navigate(['/inicio']);
    }
  }
}
