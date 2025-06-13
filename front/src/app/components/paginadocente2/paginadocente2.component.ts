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

  // Documentos
  archivoSeleccionado!: File;
  documentos: { nombre: string; competencia: string }[] = [];

  // Links
  linkSeleccionado!: string;
  nombreLink: string = '';
  links: { nombre: string; url: string; competencia: string }[] = [];

  // Estado UI
  tabSeleccionado = 'documentos';
  materiaSeleccionada = '';
  competenciaSeleccionada = '';

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
    private http: HttpClient,
    private paralelosSvc: ParalelosService
  ) {
    this.materiaService.materiaSeleccionada$.subscribe(materia => {
      this.materiaSeleccionada = materia;
    });
  }

  ngOnInit() {
    console.log('PaginadocenteComponent initialized');
    this.cargarDocumentosPorCompetencia();
    this.cargarLinksPorCompetencia();
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  abrirFormulario(tipo: string): void {
  this.tabSeleccionado = tipo;
  console.log('Abriendo formulario para:', tipo);
  this.mostrarFormulario = true;
  this.menuAbierto = false;
}


  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.archivoSeleccionado = undefined!;
    this.linkSeleccionado = '';
    this.nombreLink = '';
    this.competenciaSeleccionada = '';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/iniciosesion']);
  }

  onFileChange(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files?.length) {
    this.archivoSeleccionado = input.files[0];
    console.log('Archivo seleccionado:', this.archivoSeleccionado.name);
  } else {
    console.log('No se seleccionó archivo');
  }
}
  onLinkChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.linkSeleccionado = input.value;
    console.log('Link seleccionado:', this.linkSeleccionado);
  }

  onNombreLinkChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.nombreLink = input.value;
    console.log('Nombre del link:', this.nombreLink);
  }

  subirContenido(): void {
  if (this.tabSeleccionado.toLowerCase() === 'links') {
    console.log('Ejecutando subirLink()');
    this.subirLink();
  } else {
    console.log('Ejecutando subirArchivo()');
    this.subirArchivo();
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
          error: err => console.error('Error al subir archivo', err)
        });
    } else {
      alert('Completa todos los campos y selecciona un archivo');
    }
  }

  subirLink(): void {
  if (this.linkSeleccionado && this.nombreLink && this.materiaSeleccionada && this.competenciaSeleccionada) {
    console.log('Datos a enviar al backend:', {
      link: this.linkSeleccionado,
      nombre: this.nombreLink,
      materia: this.materiaSeleccionada,
      competencia: this.competenciaSeleccionada
    });
    this.authService
      .subirLink(this.linkSeleccionado, this.nombreLink, this.materiaSeleccionada, this.competenciaSeleccionada)
      .subscribe({
        next: () => {
          this.links.push({
            nombre: this.nombreLink,
            url: this.linkSeleccionado,
            competencia: this.competenciaSeleccionada
          });
          this.cerrarFormulario();
        },
        error: err => console.error('Error al subir link', err)
      });
  } else {
    alert('Completa todos los campos para el link');
  }
}


  obtenerItemsPorCompetencia(competencia: string): any[] {
    return this.documentos.filter(d => d.competencia === competencia);
  }

  obtenerLinksPorCompetencia(competencia: string): any[] {
    return this.links.filter(l => l.competencia === competencia);
  }

  cargarDocumentosPorCompetencia(): void {
    this.authService.OrdenarMarkov().subscribe((data: any) => {
      this.documentos.push(...data.map((doc: any) => ({
        nombre: doc.nombre,
        competencia: 'Cadenas de Márkov'
      })));
    });


    this.authService.OrdenarColas().subscribe((data: any) => {
      this.documentos.push(...data.map((doc: any) => ({
        nombre: doc.nombre,
        competencia: 'Teoría de Líneas de Espera'
      })));
    });

    this.authService.OrdenarSimulacion().subscribe((data: any) => {
      this.documentos.push(...data.map((doc: any) => ({
        nombre: doc.nombre,
        competencia: 'Simulación de Sistemas'
      })));
    });

    this.authService.OrdenarDecisiones().subscribe((data: any) => {
      this.documentos.push(...data.map((doc: any) => ({
        nombre: doc.nombre,
        competencia: 'Toma de Decisiones Multicriterio'
      })));
    });

    this.authService.OrdenarInventarios().subscribe((data: any) => {
      this.documentos.push(...data.map((doc: any) => ({
        nombre: doc.nombre,
        competencia: 'Gestión de Inventarios'
      })));
    });
  }

  cargarLinksPorCompetencia(): void {
    this.authService.LinksMarkov().subscribe((data: any) => {
      this.links.push(...data.map((l: any) => ({
        nombre: l.nombre,
        url: l.url,
        competencia: 'Cadenas de Márkov'
      })));
    });

    this.authService.LinksColas().subscribe((data:any) => {
      console.log("Links de programación recibidos:", data);
      this.links.push(...data.map((l: any) => ({
        nombre: l.nombre,
        url: l.url,
        competencia: 'Teoría de Líneas de Espera'
      })));
    });

    this.authService.LinksSimulacion().subscribe((data: any) => {
      this.links.push(...data.map((l: any) => ({
        nombre: l.nombre,
        url: l.url,
        competencia: 'Simulación de Sistemas'
      })));
    });

    this.authService.LinksDecisiones().subscribe((data: any) => {
      this.links.push(...data.map((l: any) => ({
        nombre: l.nombre,
        url: l.url,
        competencia: 'Toma de Decisiones Multicriterio'
      })));
    });

    this.authService.LinksInventarios().subscribe((data: any) => {
      this.links.push(...data.map((l: any) => ({
        nombre: l.nombre,
        url: l.url,
        competencia: 'Gestión de Inventarios'
      })));
    });
  }

   eliminarDoc(doc: any) {
    this.authService.borrarDocumento(doc).subscribe({
      next: () => {
        alert('Documento eliminado correctamente');

        this.documentos = this.documentos.filter(d => d.nombre !== doc.nombre);
        console.log('Documento eliminado:', doc);
      },
      error: err => {
        alert('Error al eliminar el documento');
      }
    });
  }

  eliminarLink(link: any) {
    this.authService.borrarLink(link.nombre).subscribe({
      next: () => {
        alert('Link eliminado correctamente');

        this.links = this.links.filter(l => l.nombre !== link.nombre);
        console.log('Link eliminado:', link);
      },
      error: err => {
        alert('Error al eliminar el link');
      }
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

    // alert(Usuario a eliminar: ${email} del paralelo: ${paralelo});

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
