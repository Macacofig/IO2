import { Component } from '@angular/core';

@Component({
  selector: 'app-formparalelo',
  imports: [],
  templateUrl: './formparalelo.component.html',
  styleUrl: './formparalelo.component.css'
})
export class FormparaleloComponent {
  cancelar() {
    const form = document.getElementById('formParalelo') as HTMLFormElement;
    if (form) {
      form.style.display = 'none';
    }
  }
}
