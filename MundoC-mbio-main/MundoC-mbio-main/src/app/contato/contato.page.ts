import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage {
  constructor(private router: Router) {}

  goBack() {
    this.router.navigate(['/']); 
  }
}
