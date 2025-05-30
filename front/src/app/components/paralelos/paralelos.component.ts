import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ParalelosService } from '../../services/paralelos.service';
import { FormparaleloComponent } from '../formparalelo/formparalelo.component';

@Component({
  selector: 'app-paralelos',
  imports: [CommonModule,FormsModule, FormparaleloComponent],
  templateUrl: './paralelos.component.html',
  styleUrl: './paralelos.component.css'
})

export class ParalelosComponent {
  materiaSeleccionada = 1;
  paralelosOp1: string[] = [];
  paralelosOp2: string[] = [];
  parelelosService: ParalelosService = inject(ParalelosService);

  constructor(private router: Router, private paralelosService: ParalelosService) {
    this.parelelosService.obtenerParalelosMateria("Investigacion Operativa 1").subscribe(
      data => this.paralelosOp1 = data,
      error => console.log('Error al obtener paralelos de la materia 1', error),
      () => console.log('Paralelos de la materia 1 obtenidos exitosamente') 
    )
    
    this.parelelosService.obtenerParalelosMateria("Investigacion Operativa 2").subscribe(
      data => this.paralelosOp2 = data,
      error => console.log('Error al obtener paralelos de la materia 1:', error),
      () => alert('Paralelos de la materia 1 obtenidos exitosamente') 
    )
  }

  seleccionarMateria(num: number) {
    this.materiaSeleccionada = num;
  }

  obtenerParalelosActuales(): string[] {
    return this.materiaSeleccionada === 1 ? this.paralelosOp1 : this.paralelosOp2;
  }

  agregarParalelo() {
    // this.apiService.getUsuarios().subscribe({
    //   next: (usuarios) => {
    //     console.log('Usuarios:', usuarios);
    //     // Aquí puedes usar los datos si lo necesitas
    //   },
    //   error: (err) => {
    //     console.error('Error al obtener usuarios:', err);
    //   }
    // });
    // const lista = this.obtenerParalelosActuales();
    // const nuevoNombre = `Paralelo ${lista.length + 1}`;
    // if (this.materiaSeleccionada === 1) {
    //   this.paralelosOp1.push(nuevoNombre);
    // } else {
    //   this.paralelosOp2.push(nuevoNombre);
    // }

    const form = document.getElementById('formParalelo') as HTMLFormElement;
    form.style.display = 'block';
  }

  eliminarParalelo() {
    if (this.materiaSeleccionada === 1 && this.paralelosOp1.length > 0) {
      this.paralelosOp1.pop();
    } else if (this.materiaSeleccionada === 2 && this.paralelosOp2.length > 0) {
      this.paralelosOp2.pop();
    }
  }

  entrarClases() {
    this.router.navigate(['/paginadocente']);
  }
}