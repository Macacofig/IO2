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
    const mat = (document.getElementById('materia') as HTMLInputElement).value;
    const par = (document.getElementById('paralelo') as HTMLInputElement).value;

    // if (!mat || !par) {
    //   alert('Por favor completa todos los campos.');
    //   return;
    // }
    console.log(mat, par)

    this.http.delete('http://localhost:3000/users/delete-users/${mat}/${par}').subscribe({
      next: (res) => {
        console.log('Eliminado correctamente:', res);
        alert('Paralelo eliminado correctamente');
      },
      error: (err) => {
        console.error('Error al eliminar:', err);
        alert('Ocurrió un error al eliminar el paralelo');
      }
    })
  }
}
