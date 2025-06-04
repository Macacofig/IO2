import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-paginaestudiantes2',
  imports: [CommonModule, FormsModule],
  templateUrl: './paginaestudiantes2.component.html',
  styleUrl: './paginaestudiantes2.component.css'
})
export class Paginaestudiantes2Component {
 documentos: any[] = [];
  competencias: string[] = ['C1', 'C2', 'C3', 'C4'];
  competenciaLabels: any = {
    C1: 'Mod1: Programación Lineal',
    C2: 'Mod2: Análisis Post-Óptimo',
    C3: 'Mod3: Transporte, Asignación y Trasbordo',
    C4: 'Mod4: Redes, PERT y CPM'
  };

  competenciaSeleccionada: string = '';
  sugerenciaTexto: string = '';
  mostrarFormulario = false;
  menuAbierto = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.cargarDocumentosEstudiante();
  }

  cargarDocumentosEstudiante(): void {
    this.authService.OrdenarProgramacionE().subscribe((res: any) => {
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C1' })));
    });

    this.authService.OrdenarAnalisisE().subscribe((res: any) => {
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C2' })));
    });

    this.authService.OrdenarTransporteE().subscribe((res: any) => {
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C3' })));
    });

    this.authService.OrdenarRedesE().subscribe((res: any) => {
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C4' })));
    });
  }

  obtenerItemsPorCompetencia(competencia: string): any[] {
    return this.documentos.filter(doc => doc.competencia === competencia);
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.menuAbierto = false;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.competenciaSeleccionada = '';
    this.sugerenciaTexto = '';
  }

  enviarSugerencia(): void {
    if (!this.competenciaSeleccionada || !this.sugerenciaTexto.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    const sugerencia = {
      competencia: this.competenciaSeleccionada,
      texto: this.sugerenciaTexto,
      fecha: new Date(),
      rol: 'estudiante'
    };

    console.log('Sugerencia enviada:', sugerencia);
    alert('Gracias por tu sugerencia.');
    this.cerrarFormulario();
  }
}
