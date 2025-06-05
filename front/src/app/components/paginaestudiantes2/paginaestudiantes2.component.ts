import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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
    C1: 'Cadenas de Márkov',
    C2: 'Teoría de Líneas de Espera',
    C3: 'Simulación de Sistemas',
    C4: 'Toma de Decisiones Multicriterio',
    C5: 'Gestión de Inventarios'
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
    this.authService.OrdenarMarkovE().subscribe((res: any) => {
      console.log('Cadenas de Márkov (C1):', res);
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C1' })));
    });

    this.authService.OrdenarColasE().subscribe((res: any) => {
      console.log('Teoría de Líneas de Espera (C2):', res);
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C2' })));
    });

    this.authService.OrdenarSimulacionE().subscribe((res: any) => {
      console.log('Simulación de Sistemas (C3):', res);
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C3' })));
    });

    this.authService.OrdenarDecisionesE().subscribe((res: any) => {
      console.log('Toma de Decisiones Multicriterio (C4):', res);
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C4' })));
    });

    this.authService.OrdenarInventariosE().subscribe((res: any) => {
      console.log('Gestión de Inventarios (C5):', res);
      this.documentos.push(...res.map((doc: any) => ({ ...doc, competencia: 'C5' })));
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
