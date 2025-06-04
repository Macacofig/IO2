import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable(); 

  private apiUrl = 'http://localhost:3000'; // URL base del backend

  constructor(private http: HttpClient) {}

  // Método para iniciar sesión
  login(usuario: { email: string, materia: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, usuario);
  }

  // Cargar archivos
  cargarArchivo(file: File, materia: string, tema: string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('materia', materia);
    formData.append('tema', tema);

    return this.http.post(`${this.apiUrl}/files/upload`, formData);
  }

  // Métodos IO2
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

  // Métodos IO1
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
}
