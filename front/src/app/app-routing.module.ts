import { Route } from '@angular/router';
import { IniciosesionComponent } from './components/iniciosesion/iniciosesion.component';
import { PaginainicioComponent } from './components/paginainicio/paginainicio.component';
import { ParalelosComponent } from './components/paralelos/paralelos.component';
import { PaginadocenteComponent } from './components/paginadocente/paginadocente.component';

export const APP_ROUTES: Route[] = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PaginainicioComponent }, // Ruta para la página 1
  { path: 'iniciosesion', component: IniciosesionComponent},
  { path: 'paralelos', component: ParalelosComponent },
  { path: 'paginadocente', component: PaginadocenteComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
]