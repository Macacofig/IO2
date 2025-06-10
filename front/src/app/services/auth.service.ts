import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable(); 

  private apiUrl = 'https://educationio.onrender.com'; // URL base del backend

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(usuario: { email: string, materia: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, usuario);
  }

  // Cerrar sesión
  logout() {
    localStorage.removeItem('access_token');
    this.userSubject.next(null);
  }

  // Cargar archivos
  cargarArchivo(file: File, materia: string, tema: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    
    formData.append('materia', materia);
    formData.append('tema', tema);

    return this.http.post(`${this.apiUrl}/files/upload`, formData);
  }

  // Métodos IO2 docente
  OrdenarMarkov() {
    return this.http.get(`${this.apiUrl}/files/MarkovD`);
  }

  OrdenarColas() {
    return this.http.get(`${this.apiUrl}/files/ColasD`);
  }

  OrdenarSimulacion() {
    return this.http.get(`${this.apiUrl}/files/SimulacionD`);
  }

  OrdenarDecisiones() {
    return this.http.get(`${this.apiUrl}/files/DecisionesD`);
  }

  OrdenarInventarios() {
    return this.http.get(`${this.apiUrl}/files/InventariosD`);
  }

  // Métodos IO1 docente
  OrdenarProgramacion() {
    return this.http.get(`${this.apiUrl}/files/ProgramacionLinealD`);
  }

  OrdenarAnalisis() {
    return this.http.get(`${this.apiUrl}/files/AnalisisPostOptimalD`);
  }

  OrdenarTransporte() {
    return this.http.get(`${this.apiUrl}/files/TransporteAsignacionTrasbordoD`);
  }

  OrdenarRedes() {
    return this.http.get(`${this.apiUrl}/files/RedesPERTCPMD`);
  }

  // Métodos IO2 estudiante
  OrdenarMarkovE() {
    return this.http.get(`${this.apiUrl}/files/Markov`);
  }

  OrdenarColasE() {
    return this.http.get(`${this.apiUrl}/files/Colas`);
  }

  OrdenarSimulacionE() {
    return this.http.get(`${this.apiUrl}/files/Simulacion`);
  }

  OrdenarDecisionesE() {
    return this.http.get(`${this.apiUrl}/files/Decisiones`);
  }

  OrdenarInventariosE() {
    return this.http.get(`${this.apiUrl}/files/Inventarios`);
  }

  // Métodos IO1 estudiante
  OrdenarProgramacionE() {
    return this.http.get(`${this.apiUrl}/files/ProgramacionLineal`);
  }

  OrdenarAnalisisE() {
    return this.http.get(`${this.apiUrl}/files/AnalisisPostOptimal`);
  }

  OrdenarTransporteE() {
    return this.http.get(`${this.apiUrl}/files/TransporteAsignacionTrasbordo`);
  }

  OrdenarRedesE() {
    return this.http.get(`${this.apiUrl}/files/RedesPERTCPM`);
  }
}
