import { Route } from '@angular/router';
import { IniciosesionComponent } from './components/iniciosesion/iniciosesion.component';
import { PaginainicioComponent } from './components/paginainicio/paginainicio.component';
import { ParalelosComponent } from './components/paralelos/paralelos.component';
import { PaginadocenteComponent } from './components/paginadocente/paginadocente.component';
import { PaginaestudiantesComponent } from './components/paginaestudiantes/paginaestudiantes.component';
import { Paginadocente2Component } from './components/paginadocente2/paginadocente2.component';

export const APP_ROUTES: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PaginainicioComponent }, // Ruta para la página 1
  { path: 'iniciosesion', component: IniciosesionComponent},
  { path: 'paralelos', component: ParalelosComponent },
  { path: 'paginadocente1', component: PaginadocenteComponent },
  { path: 'paginadocente2', component: Paginadocente2Component },
  { path: 'paginaestudiante', component: PaginaestudiantesComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
]