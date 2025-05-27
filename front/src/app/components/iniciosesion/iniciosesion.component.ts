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
    this.verificarDatos();

    const usuario = {
      email: this.email,
      materia: this.materia,
      password: this.password
    };
    console.log('usuario:',usuario);
    this.authService.login(usuario).subscribe(
      (respuesta) => {
        console.log('Respuesta del backend:', respuesta);
        

        if (this.email === this.correoEspecial) {
          // Solo rluzjan@ucb.edu.bo debe ingresar con contraseña
          if (this.password === 'InvestigacionOperativa') {
            this.router.navigate(['/paralelos']);
          } else {
            this.mensajeError = 'Contraseña incorrecta';
            alert(this.mensajeError);
          }
        } else {
          // Otros usuarios: solo se requiere materia
          if (this.materia) {
            this.router.navigate(['/paginaestudiante']);
          } else {
            this.mensajeError = 'Selecciona una materia';
            alert(this.mensajeError);
          }
        }
      },
      (error) => {
        console.error('Error desde backend:', error);
        this.mensajeError = 'Error en el inicio de sesión';
        alert(this.mensajeError);
      }
    );
  }
}
