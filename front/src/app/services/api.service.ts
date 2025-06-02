import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'http://localhost:3000';
  private token: string | null = null; 
  

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('access_token');
    console.log('Token inicial:', this.token);
   }

  

  isAuthenticated(): boolean {
    console.log(this.token)
    return !!this.token;
  }
  /*
    Método genérico para manejar peticiones POST
  */
  postRequest<T>(endpoint: string, data: any): Observable<T> {
    this.token = localStorage.getItem('access_token');
    console.log('Token:', this.token);
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data, { headers })
      .pipe(
        catchError((error) => {
          console.error(`Error al hacer POST a ${endpoint}:`, error);
          return throwError(() => error);
        })
      );
  }

  getRequest<T>(endpoint: string): Observable<T> {
    this.token = localStorage.getItem('access_token');
    console.log('Token:', this.token);
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { headers })
      .pipe(
        catchError((error) => {
          console.error(`Error al hacer GET a ${endpoint}:`, error);
          return throwError(() => error);
        })
      );
  }

  putRequest<T>(endpoint: string, data: any): Observable<T> {
    this.token = localStorage.getItem('access_token');
    console.log('Token:',this.token);
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data, { headers })
      .pipe(
        catchError((error) => {
          console.error(`Error al hacer PUT a ${endpoint}:`, error);
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
