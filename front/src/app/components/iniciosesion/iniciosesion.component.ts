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
  correo: string = '';
  numero: string = '';
  passwpord: string = '';
  passwpordHabilitada: boolean = false;

  // Credenciales especiales para desbloquear
  correoEspecial = 'especial@ejemplo.com';
  numeroEspecial = '123456';

  constructor(private router: Router) {}

  verificarDatos() {
    // Desbloquear contraseña solo si coinciden correo y número
    this.passwpordHabilitada = 
      this.correo === this.correoEspecial && this.numero === this.numeroEspecial;
  }

  ingresar() {
    // Si están desbloqueados, validar contraseña y redirigir a Página A
    if (this.passwpordHabilitada) {
      if (this.passwpord === 'claveSegura') {
        this.router.navigate(['/paralelos']); // Página para usuarios especiales
      } else {
        alert('Contraseña incorrecta');
      }
    } else {
      this.router.navigate(['/home']); // Página general
    }
  }
}
