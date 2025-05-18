import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { PaginainicioComponent } from "./components/paginainicio/paginainicio.component";
import { ParalelosComponent } from "./components/paralelos/paralelos.component";
import { IniciosesionComponent } from './components/iniciosesion/iniciosesion.component';
import { PaginadocenteComponent } from './components/paginadocente/paginadocente.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    PaginainicioComponent, 
    ParalelosComponent,
    PaginadocenteComponent,
    IniciosesionComponent,
    HttpClientModule 
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'front';
}
