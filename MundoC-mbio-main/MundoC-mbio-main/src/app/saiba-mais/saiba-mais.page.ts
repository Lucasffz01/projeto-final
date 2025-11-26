import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saiba-mais',
  templateUrl: './saiba-mais.page.html',
  styleUrls: ['./saiba-mais.page.scss'],
})
export class SaibaMaisPage {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); // Navega para a página inicial
  }
}
