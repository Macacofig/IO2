import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  /*
    Método genérico para manejar peticiones POST
  */
  postRequest<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data)
      .pipe(
        catchError((error) => {
          console.error(`Error al hacer POST a ${endpoint}:`, error);
          return throwError(() => error);
        })
      );
  }

  /*--------------USUARIOS---------------- */
  // Ejemplo de método para obtener usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

}
