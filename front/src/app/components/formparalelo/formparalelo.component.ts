import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-formparalelo',
  imports: [],
  templateUrl: './formparalelo.component.html',
  styleUrl: './formparalelo.component.css'
})
export class FormparaleloComponent {

  constructor(private http: HttpClient) {}


  cancelar() {
    const form = document.getElementById('formParalelo') as HTMLFormElement;
    if (form) {
      form.style.display = 'none';
    }
  }

  agregar(event: Event) 
  {
    event.preventDefault();
    const materia = (document.getElementById('materia') as HTMLInputElement).value;
    const paralelo = (document.getElementById('paralelo') as HTMLInputElement).value;
    const fileInput = document.getElementById('file') as HTMLInputElement;
    const file = fileInput?.files?.[0];

    if (!materia || !paralelo || !file) {
      alert('Por favor completa todos los campos y selecciona un archivo.');
      return;
    }

    const formData = new FormData();
    formData.append('materia', materia);
    formData.append('paralelo', paralelo);
    formData.append('file', file);

    this.http.post('https://educationio.onrender.com/users/upload-excel', formData).subscribe({
      next: (res) => {
        alert('paralelo agregado correctamente');
        console.log(res);
        window.location.reload();
      },
      error: (err) => {
        console.error('Error al subir:', err);
        alert('Ocurrió un error al subir el archivo');
      }
    });
  }

}
