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
  competencias: string[] = ['C1', 'C2', 'C3', 'C4', 'C5'];

  competenciaLabels: any = {
    C1: 'Programación Lineal y Dual',
    C2: 'Análisis Post-Optimal',
    C3: 'Transporte, Asignación y Trasbordo ',
    C4: 'Redes: PERT/CPM',
    C5: 'Material Bibliografico'
  };

  competenciaSeleccionada: string = '';
  sugerenciaTexto: string = '';
  mostrarFormulario = false;
  menuAbierto = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.cargarMaterialEstudiante();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/iniciosesion']);
  }

  volverAInicio() {
    this.router.navigate(['/iniciosesion']);
  }

  cargarMaterialEstudiante(): void {
    // DOCUMENTOS
    this.authService.OrdenarProgramacionE().subscribe((res: any) => {
      this.documentos.push(...res.map((doc: any) => ({
        ...doc,
        competencia: 'C1',
        tipo: 'documento'
      })));
    });

    this.authService.OrdenarAnalisisE().subscribe((res: any) => {
      this.documentos.push(...res.map((doc: any) => ({
        ...doc,
        competencia: 'C2',
        tipo: 'documento'
      })));
    });

    this.authService.OrdenarTransporteE().subscribe((res: any) => {
      this.documentos.push(...res.map((doc: any) => ({
        ...doc,
        competencia: 'C3',
        tipo: 'documento'
      })));
    });

    this.authService.OrdenarRedesE().subscribe((res: any) => {
      this.documentos.push(...res.map((doc: any) => ({
        ...doc,
        competencia: 'C4',
        tipo: 'documento'
      })));
    });

    // LINKS
    this.authService.LinksProgramacion().subscribe((res: any) => {
      this.documentos.push(...res.map((link: any) => ({
        ...link,
        competencia: 'C1',
        tipo: 'link'
      })));
    });

    this.authService.LinksAnalisis().subscribe((res: any) => {
      this.documentos.push(...res.map((link: any) => ({
        ...link,
        competencia: 'C2',
        tipo: 'link'
      })));
    });

    this.authService.LinksTransporte().subscribe((res: any) => {
      this.documentos.push(...res.map((link: any) => ({
        ...link,
        competencia: 'C3',
        tipo: 'link'
      })));
    });

    this.authService.LinksRedes().subscribe((res: any) => {
      this.documentos.push(...res.map((link: any) => ({
        ...link,
        competencia: 'C4',
        tipo: 'link'
      })));
    });

    //LIBROS
    this.authService.Verlibro1E().subscribe((res: any) => {
      this.documentos.push(...res.map((doc: any) => ({
        ...doc,
        competencia: 'C5',
        tipo: 'documento'
      })));
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

  abrirLink(link: any): void {
    if (!link || !link.link) {
      console.error('❌ Link inválido:', link);
      return;
    }

    window.open(link.link, '_blank');
    console.log('Abriendo link:', link);
  }


  obtenerItemsPorCompetencia(competencia: string, tipo: 'documento' | 'link'): any[] {
    return this.documentos.filter(item => item.competencia === competencia && item.tipo === tipo);
  }

  obtenerItemsPorMaterialBibliografico(): any[] {
    return this.documentos.filter(d => d.competencia === 'Material Bibliografico');
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
