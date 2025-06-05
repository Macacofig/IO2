import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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

  passwordVisible: boolean = false;
  mensajeError: string = '';

  // Flags para errores
  passwordE: boolean = false;
  materiaE: boolean = false;

  correoEspecial: string = 'rlujan@ucb.edu.bo';

  constructor(private authService: AuthService, private router: Router) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  verificarDatos() {
    const esEspecial = this.email === this.correoEspecial;
    this.passwordE = esEspecial;
    this.materiaE = !esEspecial;
  }

  ingresar() {
    const usuario = {
      email: this.email,
      materia: this.materia,
      password: this.password
    };

    this.authService.login(usuario).subscribe(
    (respuesta) => {
      console.log('Respuesta del backend:', respuesta);
      localStorage.setItem('access_token', respuesta.jwt);

      const esEspecial = this.email === this.correoEspecial;

      if (esEspecial) {
        this.router.navigate(['/paralelos']); // Docente o admin
      } else {
        // Cambiar lógica basada en tipo
        switch (respuesta.tipo) {
          case 1:
            this.router.navigate(['/paginaestudiante']); // Ejemplo: estudiante IO1
            break;
          case 2:
            this.router.navigate(['/paginaestudiante2']); // Ejemplo: estudiante IO2
            break;
          default:
            this.mensajeError = 'Tipo de usuario no reconocido';
            alert(this.mensajeError);
            break;
        }
      }
    },
    (error) => {
      console.error('Error desde backend:', error);
      if (error.status === 404) {
        this.mensajeError = 'Este Usuario no pertenece a la materia:' + this.materia;
      } else if (error.status === 401) {
        this.mensajeError = 'Contraseña incorrecta';
      } else {
        this.mensajeError = 'Error en el inicio de sesión';
      }
      alert(this.mensajeError);
    }
  );
  }
}

