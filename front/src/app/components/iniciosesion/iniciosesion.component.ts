import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-iniciosesion',
  imports: [CommonModule, FormsModule],
  templateUrl: './iniciosesion.component.html',
  styleUrl: './iniciosesion.component.css'
})

export class IniciosesionComponent {
  email: string = '';
  materia: string = '';
  password: string = '';

  passwordE: boolean = false;
  materiaE: boolean = false;

  // Credencial especial
  correoEspecial = 'rlujan@ucb.edu.bo';

  constructor(private router: Router) {}

  verificarDatos() {
    const esEspecial = this.email === this.correoEspecial;
    this.passwordE = esEspecial;
    this.materiaE = !esEspecial;
  }

  ingresar() {
    if (this.passwordE) {
      // Usuario especial: requiere contraseña
      if (this.password === 'InvestigacionOperativa') {
        this.router.navigate(['/paralelos']);
      } else {
        alert('Contraseña incorrecta');
      }
    } else {
      // Usuario normal: redirige sin contraseña
      if (this.materia) {
        this.router.navigate(['/home']);
      } else {
        alert('Selecciona una materia');
      }
    }
  }
}
