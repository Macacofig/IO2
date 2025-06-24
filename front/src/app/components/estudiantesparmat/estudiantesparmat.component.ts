import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MateriaService } from '../../services/materia.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ParalelosService } from '../../services/paralelos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-estudiantesparmat',
  imports: [CommonModule, FormsModule],
  templateUrl: './estudiantesparmat.component.html',
  styleUrl: './estudiantesparmat.component.css'
})
export class EstudiantesparmatComponent implements OnInit{
  materiaSeleccionada = '';
  paraleloSeleccionado = '';

  estudiantes: string[] = [];

  constructor(
    private authService: AuthService,
    private materiaService: MateriaService,
    private router: Router,
    private http: HttpClient,
    private paralelosSvc: ParalelosService
  ) {
    this.materiaService.materiaSeleccionada$.subscribe(materia => {
      this.materiaSeleccionada = materia;
    });

    this.paralelosSvc.paraleloSeleccionado$.subscribe(paralelo => {
      this.paraleloSeleccionado = paralelo;
    });

    this.paralelosSvc.obtenerUsuariosPorParalelo(this.materiaSeleccionada, this.paraleloSeleccionado).subscribe(
      data => this.estudiantes = data,
      error => console.log('Error al obtener estudiantes por paralelo:', error),
      () => console.log('Estudiantes por paralelo obtenidos exitosamente')
    )

    console.log(this.estudiantes);
  }

  ngOnInit() {
    console.log('materiaSeleccionada: ', this.materiaSeleccionada);
    console.log('estudiantesparmat paraleloSeleccionado: ', this.paraleloSeleccionado);

    this.paralelosSvc.obtenerUsuariosPorParalelo(this.materiaSeleccionada, this.paraleloSeleccionado).subscribe(
      data => this.estudiantes = data,
      error => console.log('Error al obtener estudiantes por paralelo:', error),
      () => console.log('Estudiantes por paralelo obtenidos exitosamente')
    )
  }

  // Botón para cerrar sesión
  logout() {
    localStorage.removeItem('materia');
    localStorage.removeItem('paralelo');
    this.authService.logout();
    this.router.navigate(['/iniciosesion']);
  }

  eliminarEstudiante(emailEst : string) {
    const paralelo = this.paraleloSeleccionado;


    console.log("Estudiantes: ", this.estudiantes);
    console.log('Email:', emailEst);
    console.log('Paralelo:', paralelo);

    this.http.request('DELETE', 'https://educationio.onrender.com/users/delete-user-paralelo', {
    body: {
      email: emailEst,
      paralelo: paralelo
    }
    }).subscribe({
      next: (res) => {
        console.log('Estudiante Eliminado correctamente:', res);
        alert('Estudiante eliminado correctamente');
        window.location.reload();
      },
      error: (err) => {
        console.error('Error al eliminar estudiante:', err);
        alert('Ocurrió un error al eliminar el estudiante');
      }
    });
  }

  volverAParalelos() {
    this.router.navigate(['/paralelos']);
  }
}
