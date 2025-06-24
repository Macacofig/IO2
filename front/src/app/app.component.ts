import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { PaginainicioComponent } from "./components/paginainicio/paginainicio.component";
import { ParalelosComponent } from "./components/paralelos/paralelos.component";
import { IniciosesionComponent } from './components/iniciosesion/iniciosesion.component';
import { PaginadocenteComponent } from './components/paginadocente/paginadocente.component';
import { PaginaestudiantesComponent } from "./components/paginaestudiantes/paginaestudiantes.component";
import { Paginaestudiantes2Component } from './components/paginaestudiantes2/paginaestudiantes2.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
