import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
@Component({
  selector: 'app-paginadocente',
  imports: [CommonModule, FormsModule],
  templateUrl: './paginadocente.component.html',
  styleUrl: './paginadocente.component.css'
})
export class PaginadocenteComponent {
 tabSeleccionado: string = 'documentos';
  constructor(private router: Router, private apiService : ApiService) {}

  ngOnInit() {
    try {
      if(!(this.apiService.isAuthenticated()))
      {
        throw new Error('Usuario no autenticado');

      }
      
    } catch (error) {
      console.error("sin token");
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
    this.router.navigate(['/iniciosesion']);
      
    }
  }
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
}