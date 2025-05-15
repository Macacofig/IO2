import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paginainicio',
  imports: [CommonModule,FormsModule],
  templateUrl: './paginainicio.component.html',
  styleUrl: './paginainicio.component.css'
})

export class PaginainicioComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/iniciosesion']);
    }, 3000);
  }
}
