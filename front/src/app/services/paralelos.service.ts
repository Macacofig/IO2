import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParalelosService {


  url: string = 'http://localhost:3000/users/';

  constructor(private http: HttpClient) { }

  obtenerParalelosMateria(materia: string): Observable<string[]> {
    console.log(materia);
    return this.http.post<string[]>(`http://localhost:3000/users/paralelos-materia`, { materia } );
  }

  subirExcelUsuarios(file: File, materia: string, paralelo: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);           
    formData.append('materia', materia);     
    formData.append('paralelo', paralelo);   

    return this.http.post(`${this.url}upload-excel`, formData);
  }

  eliminarParalelo(materia: string, paralelo: string): Observable<any> {
    return this.http.post(`${this.url}delete-users`, { materia, paralelo });
  }

  obtenerUsuarios(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}emails`);
  }

  eliminarUsuario(email: string, paralelo: string): Observable<any> {
    console.log(email, paralelo);
    return this.http.post(`${this.url}delete-user-paralelo`, { email, paralelo });
  }

  obtenerUsuariosPorParalelo(materia: string, paralelo: string): Observable<string[]> {
    console.log(materia);
    console.log(paralelo);
    return this.http.post<string[]>(`http://localhost:3000/users/emails-by-materia-paralelo`, { materia, paralelo } );
  }
}
