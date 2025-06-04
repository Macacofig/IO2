import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MateriaService } from '../../services/materia.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginadocente',
  imports: [CommonModule, FormsModule],
  templateUrl: './paginadocente.component.html',
  styleUrls: ['./paginadocente.component.css']
})
export class PaginadocenteComponent {
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
    'Redes: PERT/CPM', 
    'Cadenas de Markov'
  ];

  competenciaLabels: { [key: string]: string } = {
    'Programación Lineal y Dual': 'Programación Lineal y Dual',
    'Post Optimal': 'Analisis Post-Optimal',
    'Asignación y Trasbordo': 'Transporte Asignacion Transbordo',
    'Redes: PERT/CPM': 'Redes: PERT/CPM',
    'Cadenas de Markov': 'Cadenas de Markov'
  };

  constructor(
    private authService: AuthService,
    private materiaService: MateriaService,
    private router: Router
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

    this.authService.OrdenarRedes().subscribe((data: any) => {
      this.documentos.push(...data.map((doc: any) => ({
        nombre: doc.nombre,
        competencia: 'Redes: PERT/CPM'
      })));
    });
    

    // this.authService.OrdenarMarkov().subscribe((data: any) => {
    //   this.documentos = data.map((doc: any) => ({
    //     nombre: doc.nombre,
    //     competencia: 'Cadenas de Markov'
    //   }));
    // });
    
    // this.authService.OrdenarColas().subscribe((data: any) => {
    //   this.documentos.push(...data.map((doc: any) => ({
    //     nombre: doc.nombre,
    //     competencia: 'Comp2'
    //   })));
    // });

    // // this.authService.OrdenarSimulacion().subscribe((data: any) => {
    //   //   this.documentos.push(...data.map((doc: any) => ({
    //     //     nombre: doc.nombre,
    //     //     competencia: 'Comp3'
    //     //   })));
    //     // });
        
    //     this.authService.OrdenarDecisiones().subscribe((data: any) => {
    //       this.documentos.push(...data.map((doc: any) => ({
            
    //         nombre: doc.nombre,
    //         competencia: 'Comp4'
    //       })));
    //     });
    //     console.log(this.documentos.toString())
        
    //     // this.authService.OrdenarInventarios().subscribe((data: any) => {
    // //   this.documentos.push(...data.map((doc: any) => ({
    // //     nombre: doc.nombre,
    // //     competencia: 'Comp5'
    // //   })));
    // // });

  }

  volverAParalelos() {
    this.router.navigate(['/paralelos']);
  }
}
