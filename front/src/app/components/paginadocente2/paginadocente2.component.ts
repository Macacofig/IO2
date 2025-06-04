import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MateriaService } from '../../services/materia.service';

@Component({
  selector: 'app-paginadocente2',
  imports: [CommonModule, FormsModule],
  templateUrl: './paginadocente2.component.html',
  styleUrls: ['./paginadocente2.component.css']
})
export class Paginadocente2Component {
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
    'Cadenas de Markov': 'Mod1: Cadenas de Markov',
    'Teoría de Líneas de Espera': 'Mod2: Teoría de Líneas de Espera',
    'Simulación de Sistemas': 'Mod3: Simulación de Sistemas',
    'Toma de Decisiones Multicriterio': 'Mod4: Toma de Decisiones Multicriterio',
    'Gestión de Inventarios': 'Mod5: Gestión de Inventarios'
  };

  constructor(
    private authService: AuthService,
    private materiaService: MateriaService
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
}
