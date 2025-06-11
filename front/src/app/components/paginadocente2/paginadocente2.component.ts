import { AuthService } from '../../services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MateriaService } from '../../services/materia.service';

import { ParalelosService } from '../../services/paralelos.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paginadocente2',
  imports: [CommonModule, FormsModule],
  templateUrl: './paginadocente2.component.html',
  styleUrls: ['./paginadocente2.component.css']
})
export class Paginadocente2Component implements OnInit {

  mostrarFormulario = false;
  menuAbierto = false;

  archivoSeleccionado!: File;
  materiaSeleccionada: string = '';
  competenciaSeleccionada: string = '';
  tabSeleccionado = 'documentos';

  documentos: { nombre: string; competencia: string }[] = [];

  competencias: string[] = [
    'Cadenas de Márkov',
    'Teoría de Líneas de Espera',
    'Simulación de Sistemas',
    'Toma de Decisiones Multicriterio',
    'Gestión de Inventarios' 
  ];

  competenciaLabels: { [key: string]: string } = {
    'Cadenas de Márkov': 'Cadenas de Márkov',
    'Teoría de Líneas de Espera': 'Teoría de Líneas de Espera',
    'Simulación de Sistemas': 'Simulación de Sistemas',
    'Toma de Decisiones Multicriterio': 'Toma de Decisiones Multicriterio',
    'Gestión de Inventarios': 'Gestión de Inventarios'
  };

  constructor(
    private authService: AuthService,
    private materiaService: MateriaService,
    private router: Router,
    private http: HttpClient
  ) {
    this.materiaService.materiaSeleccionada$.subscribe(materia => {
      console.log('Materia seleccionada en paginadocente:', materia);
      this.materiaSeleccionada = materia;

      if (this.materiaSeleccionada) {
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
  logout(){
    this.authService.logout();
    this.router.navigate(['/iniciosesion']);
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.archivoSeleccionado = input.files[0];
    }
  }

  subirArchivo(): void {
    if (this.archivoSeleccionado && this.materiaSeleccionada && this.competenciaSeleccionada) {
      console.log('Subiendo archivo:', this.archivoSeleccionado.name);
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
  ngOnInit() {
    console.log("hola")
    this.cargarDocumentosPorCompetencia();
  }
  cargarDocumentosPorCompetencia(): void {
    this.authService.OrdenarProgramacion().subscribe((data: any) => {
      this.documentos.push(...data.map((doc: any) => ({
        nombre: doc.nombre,
        competencia: 'Programación Lineal y Dual'
      })));
    });

    
    this.authService.OrdenarAnalisis().subscribe((data: any) => {
      this.documentos.push(...data.map((doc: any) => ({
        nombre: doc.nombre,
        competencia: 'Analisis Post-Optimal'
      })));
    });
    
    this.authService.OrdenarTransporte().subscribe((data: any) => {
      this.documentos.push(...data.map((doc: any) => ({
        nombre: doc.nombre,
        competencia: 'Transporte Asignacion Transbordo'
      })));
    });

    this.authService.OrdenarRedes().subscribe((data: any) => {
      this.documentos.push(...data.map((doc: any) => ({
        nombre: doc.nombre,
        competencia: 'Redes: PERT/CPM'
      })));
    });



    
    

  }

  volverAParalelos() {
    this.router.navigate(['/paralelos']);
  }

  cancelar() {
    const form = document.getElementById('formElEstudiante') as HTMLFormElement;
    if (form) {
      form.style.display = 'none';
    }
  }
  
  paralelos : String[] = [];
  parelelosService: ParalelosService = inject(ParalelosService);
  usuarios : String[] = [];

  desplFormEliminarEst() {
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

    this.http.request('DELETE', 'https://educationio.onrender.com/users/delete-user-paralelo', {
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

}
