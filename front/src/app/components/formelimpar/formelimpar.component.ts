import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-formelimpar',
  imports: [],
  templateUrl: './formelimpar.component.html',
  styleUrl: './formelimpar.component.css'
})
export class FormelimparComponent {

  constructor(private http: HttpClient) {}

  cancelar() {
    const form = document.getElementById('formEliminar') as HTMLFormElement;
    if (form) {
      form.style.display = 'none';
    }
  }

  eliminar() {
    const materiaSelect = document.getElementById('materiaEl') as HTMLSelectElement;
    const paraleloInput = document.getElementById('paraleloEl') as HTMLInputElement;

    const mat = materiaSelect.value.trim();
    const par = paraleloInput.value.trim();

    console.log('Materia:', materiaSelect);
    console.log('Paralelo:', paraleloInput);

    if (!mat || !par) {
      alert('Por favor completa todos los campos.');
      return;
    }

    this.http.request('DELETE', 'http://localhost:3000/users/delete-users', {
    body: {
      materia: mat,
      paralelo: par
    }
    }).subscribe({
      next: (res) => {
        console.log('Eliminado correctamente:', res);
        alert('Paralelo eliminado correctamente');
        window.location.reload();
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert('Ocurrió un error al eliminar el paralelo');
      }
    })
  }
}
