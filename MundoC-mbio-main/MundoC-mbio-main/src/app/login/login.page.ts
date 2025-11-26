import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  email = '';
  senha = '';

  constructor(
    private auth: AuthService,
    private nav: NavController,
    private toast: ToastController
  ) {}

  async presentToast(msg: string) {
    const t = await this.toast.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    t.present();
  }

  login() {
    if (!this.email || !this.senha) {
      this.presentToast('Preencha todos os campos');
      return;
    }

    this.auth.login({ email: this.email, senha: this.senha }).subscribe({
      next: (res: any) => {
        if (res.status === 'sucesso') {
          localStorage.setItem('user', JSON.stringify(res.usuario));
          this.presentToast(res.mensagem);
          this.nav.navigateRoot('/home'); // redireciona para a página inicial
        } else {
          this.presentToast(res.mensagem);
        }
      },
      error: () => this.presentToast('Erro ao conectar ao servidor')
    });
  }

  // ADICIONE ESTA FUNÇÃO
  irParaRegistro() {
    this.nav.navigateForward('/register');
  }
}
