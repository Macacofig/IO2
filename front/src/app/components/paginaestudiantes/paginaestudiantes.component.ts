import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginaestudiantes',
  imports: [CommonModule, FormsModule],
  templateUrl: './paginaestudiantes.component.html',
  styleUrl: './paginaestudiantes.component.css'
})
export class PaginaestudiantesComponent {
  documentos: any[] = [];
  competencias: string[] = ['C1', 'C2', 'C3', 'C4'];
  competenciaLabels: any = {
    C1: 'Programación Lineal y Dual',
    C2: 'Análisis Post-Optimal',
    C3: 'Transporte, Asignación y Trasbordo ',
    C4: 'Redes: PERT/CPM'
  };

  competenciaSeleccionada: string = '';
  sugerenciaTexto: string = '';
  mostrarFormulario = false;
  menuAbierto = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.cargarDocumentosEstudiante();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/iniciosesion']);
  }

  volverAInicio() {
    this.router.navigate(['/iniciosesion']);
  }

  cargarDocumentosEstudiante(): void {
    this.authService.OrdenarProgramacionE().subscribe((res: any) => {
      console.log('Programación Lineal y Dual (C1):', res);
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C1' })));
    });

    this.authService.OrdenarAnalisisE().subscribe((res: any) => {
      console.log('Análisis Post-Optimal (C2):', res);
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C2' })));
    });

    this.authService.OrdenarTransporteE().subscribe((res: any) => {
      console.log('Transporte, Asignación y Trasbordo  (C3):', res);
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C3' })));
    });

    this.authService.OrdenarRedesE().subscribe((res: any) => {
      console.log('Redes: PERT/CPM (C4):', res);
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C4' })));
    });
  }

  descargarDocumento(doc: any): void {
    if (!doc || !doc.downloadUrl) {
      console.error('❌ Documento inválido:', doc);
      return;
    }

    const link = document.createElement('a');
    link.href = doc.downloadUrl;
    link.target = '_blank';
    link.download = doc.nombre || 'archivo';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('Descargando documento:', doc);
  }


  obtenerItemsPorCompetencia(competencia: string): any[] {
    const filtrados = this.documentos.filter(doc => doc.competencia === competencia);
    return filtrados;
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
