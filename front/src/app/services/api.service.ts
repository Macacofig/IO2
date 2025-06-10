import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = 'https://educationio.onrender.com';
  private token: string | null = null; 
  
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('access_token');
    console.log('Token inicial:', this.token);
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }

  isAuthenticated(): boolean {
    console.log(this.token);
    return !!this.token;
  }

  /*
    Método genérico para manejar peticiones POST
  */
  postRequest<T>(endpoint: string, data: any): Observable<T> {
  this.token = this.isBrowser() ? localStorage.getItem('access_token') : null;
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
    console.log('Token:', this.token);
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
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`);
  }

  /*---------ARCHIVOS DOCENTE------- */
  CargarArchivos(): Observable<any> {
    return this.http.post(`${this.baseUrl}/files/upload`, {});
  }

  /*---------ARCHIVOS IO2 DOCENTE------- */
  OrdenarMarkov(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/MarkovD`);
  }

  OrdenarColas(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/ColasD`);
  }

  OrdenarSimulacion(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/SimulacionD`);
  }

  OrdenarDecisiones(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/DecisionesD`);
  }

  OrdenarInventarios(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/InventariosD`);
  }

  /*---------ARCHIVOS IO1 DOCENTE====------- */
  OrdenarProgramacion(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/ProgramacionLinealD`);
  }

  OrdenarAnalisis(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/AnalisisPostOptimalD`);
  }

  OrdenarTransporte(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/TransporteAsignacionTrasbordoD`);
  }

  OrdenarRedes(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/RedesPERTCPMD`);
  }

   /*---------ARCHIVOS IO2 ESTUDIANTE------- */
  OrdenarMarkovE(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/Markov`);
  }

  OrdenarColasE(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/Colas`);
  }

  OrdenarSimulacionE(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/Simulacion`);
  }

  OrdenarDecisionesE(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/Decisiones`);
  }

  OrdenarInventariosE(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/Inventarios`);
  }

  /*---------ARCHIVOS IO1 ESTUDIANTE------- */
  OrdenarProgramacionE(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/ProgramacionLineal`);
  }

  OrdenarAnalisisE(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/AnalisisPostOptimal`);
  }

  OrdenarTransporteE(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/TransporteAsignacionTrasbordo`);
  }

  OrdenarRedesE(): Observable<any> {
    return this.http.get<any[]>(`${this.baseUrl}/files/RedesPERTCPM`);
  }
}
