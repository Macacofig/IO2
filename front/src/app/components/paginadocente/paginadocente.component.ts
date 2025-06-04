import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ParalelosService } from '../../services/paralelos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paginadocente',
  imports: [CommonModule, FormsModule],
  templateUrl: './paginadocente.component.html',
  styleUrl: './paginadocente.component.css'
})
export class PaginadocenteComponent implements OnInit {

  constructor(private http: HttpClient){}
  tabSeleccionado: string = 'documentos';

  documentos = [
    { nombre: 'Documento 1' },
    { nombre: 'Documento 2' },
    { nombre: 'Documento 3' }
  ];

  ejercicios = [
    { nombre: 'Ejercicio 1' },
    { nombre: 'Ejercicio 2' },
    { nombre: 'Ejercicio 3' }
  ];

  presentaciones = [
    { nombre: 'Presentación 1' }
  ];

  seleccionarTab(tab: string): void {
    this.tabSeleccionado = tab;
  }

  abrirModalAgregar(): void {
    // Aquí va la lógica para abrir un modal (más adelante lo puedes implementar con Angular Material o un componente propio)
    if (this.tabSeleccionado === 'documentos') {
      this.documentos.push({ nombre: `Documento ${this.documentos.length + 1}` });
    } else if (this.tabSeleccionado === 'ejercicios') {
      this.ejercicios.push({ nombre: `Ejercicio ${this.ejercicios.length + 1}` });
    } else if (this.tabSeleccionado === 'presentaciones') {
      this.presentaciones.push({ nombre: `Presentación ${this.presentaciones.length + 1}` });
    }
  }

  cancelar() {
    const form = document.getElementById('formElEstudiante') as HTMLFormElement;
    if (form) {
      form.style.display = 'none';
    }
  }

  materiaEst1 : String = 'Investigacion Operativa 3';
  paralelos : String[] = [];
  parelelosService: ParalelosService = inject(ParalelosService);
  usuarios : String[] = [];

  recuperarParalelosPorMateria() {
    const formdesp = document.getElementById('formElEstudiante') as HTMLElement;
    formdesp.style.display = 'flex';

    const materiaEst = "Investigacion Operativa 1";
    console.log(materiaEst);

    do {
      this.parelelosService.obtenerParalelosMateria(materiaEst).subscribe(
      data => this.paralelos = data,
      error => console.log('Error al obtener paralelos de la materia:', error),
      () => console.log('Paralelos de la materia obtenidos exitosamente')
    )
    } while (!this.paralelos);

    // this.parelelosService.obtenerParalelosMateria(materiaEst).subscribe(
    //   data => this.paralelos = data,
    //   error => console.log('Error al obtener paralelos de la materia:', error),
    //   () => console.log('Paralelos de la materia obtenidos exitosamente')
    // )

    console.log(this.paralelos);

    // this.parelelosService.obtenerUsuarios().subscribe(
    //   data => this.usuarios = data,
    //   error => console.log('Error al obtener usuarios:', error),
    //   () => console.log('Usuarios obtenidos exitosamente')
    // )

    this.parelelosService.obtenerUsuariosPorParalelo("Investigacion Operativa 1", "1").subscribe(
      data => this.usuarios = data,
      error => console.log('Error al obtener usuarios por paralelo:', error),
      () => console.log('Usuarios por paralelo obtenidos exitosamente')
    )

    console.log(this.usuarios);  
  };

  eliminarUsuario() {
    const email = (document.getElementById('correoEst') as HTMLInputElement).value.trim();
    const paralelo = (document.getElementById('paralelosMat') as HTMLSelectElement).value.trim();

    console.log('Email:', email);
    console.log('Paralelo:', paralelo);

    // alert(`Usuario a eliminar: ${email} del paralelo: ${paralelo}`);

    this.http.request('DELETE', 'http://localhost:3000/users/delete-user-paralelo', {
    body: {
      email: email,
      paralelo: paralelo
    }
    }).subscribe({
      next: (res) => {
        console.log('Usuario Eliminado correctamente:', res);
        alert('Usuario eliminado correctamente');
        window.location.reload();
      },
      error: (err) => {
        console.error('Error al eliminar usuario:', err);
        alert('Ocurrió un error al eliminar el usuario');
      }
    });
  }

  ngOnInit(): void {}
}