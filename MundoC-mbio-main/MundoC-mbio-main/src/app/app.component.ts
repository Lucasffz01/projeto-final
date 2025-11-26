import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  constructor(public auth: AuthService, private nav: NavController) {}

  logout() {
    this.auth.logout();
    this.nav.navigateRoot('/login'); // Redireciona para login
  }
}
