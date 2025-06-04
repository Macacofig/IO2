import { AuthService } from '../../services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MateriaService } from '../../services/materia.service';

import { ParalelosService } from '../../services/paralelos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paginadocente',
  imports: [CommonModule, FormsModule],
  templateUrl: './paginadocente.component.html',
  styleUrls: ['./paginadocente.component.css']
})
export class PaginadocenteComponent implements OnInit {

  mostrarFormulario = false;
  menuAbierto = false;

  archivoSeleccionado!: File;
  materiaSeleccionada: string = '';
  competenciaSeleccionada: string = '';
  tabSeleccionado = 'documentos';

  documentos: { nombre: string; competencia: string }[] = [];

  competencias: string[] = [
    'Programación Lineal y Dual',
    'Post Optimal',
    'Asignación y Trasbordo',
    'Redes: PERT/CPM'
  ];

  competenciaLabels: { [key: string]: string } = {
    'Programación Lineal y Dual': 'Mod1: Programación Lineal y Dual',
    'Post Optimal': 'Mod2: Analisis Post-Optimal',
    'Asignación y Trasbordo': 'Mod3: Transporte Asignacion Transbordo',
    'Redes: PERT/CPM': 'Mod4: Redes: PERT/CPM',
  };

  constructor(
    private authService: AuthService,
    private materiaService: MateriaService,
    private http: HttpClient
  ) {
    this.materiaService.materiaSeleccionada$.subscribe(materia => {
      console.log('Materia seleccionada en paginadocente:', materia);
      this.materiaSeleccionada = materia;

      if (this.materiaSeleccionada) {
        this.cargarDocumentosPorCompetencia();
      }
    });
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  abrirFormulario(tipo: string): void {
    this.tabSeleccionado = tipo;
    this.mostrarFormulario = true;
    this.menuAbierto = false;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.archivoSeleccionado = undefined!;
    this.competenciaSeleccionada = '';
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
    }
  }

  subirArchivo(): void {
    if (this.archivoSeleccionado && this.materiaSeleccionada && this.competenciaSeleccionada) {
      this.authService
        .cargarArchivo(this.archivoSeleccionado, this.materiaSeleccionada, this.competenciaSeleccionada)
        .subscribe({
          next: () => {
            this.documentos.push({
              nombre: this.archivoSeleccionado.name,
              competencia: this.competenciaSeleccionada
            });
            this.cerrarFormulario();
          },
          error: (err) => console.error('Error al subir archivo', err)
        });
    } else {
      alert('Completa todos los campos y selecciona un archivo');
    }
  }

  obtenerItemsPorCompetencia(competencia: string): any[] {
    return this.documentos.filter(doc => doc.competencia === competencia);
  }

  cargarDocumentosPorCompetencia(): void {
  this.authService.OrdenarMarkov().subscribe((data: any) => {
    this.documentos = data.map((doc: any) => ({
      nombre: doc.nombre,
      competencia: 'Comp1'
    }));
  });

  this.authService.OrdenarColas().subscribe((data: any) => {
    this.documentos.push(...data.map((doc: any) => ({
      nombre: doc.nombre,
      competencia: 'Comp2'
    })));
  });

  this.authService.OrdenarSimulacion().subscribe((data: any) => {
    this.documentos.push(...data.map((doc: any) => ({
      nombre: doc.nombre,
      competencia: 'Comp3'
    })));
  });

  this.authService.OrdenarDecisiones().subscribe((data: any) => {
    this.documentos.push(...data.map((doc: any) => ({
      nombre: doc.nombre,
      competencia: 'Comp4'
    })));
  });

  this.authService.OrdenarInventarios().subscribe((data: any) => {
    this.documentos.push(...data.map((doc: any) => ({
      nombre: doc.nombre,
      competencia: 'Comp5'
    })));
  });
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
