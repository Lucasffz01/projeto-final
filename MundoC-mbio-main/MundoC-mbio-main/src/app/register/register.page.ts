import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

  nome = '';
  email = '';
  telefone = '';
  cpf = '';
  data_nascimento = '';
  senha = '';
  confirmarSenha = '';

  constructor(
    private auth: AuthService,
    private nav: NavController,
    private toast: ToastController
  ) {}

  // -----------------------
  // 🔹 Mostrar toast
  // -----------------------
  async showToast(msg: string, color: 'success' | 'danger' = 'danger') {
    const t = await this.toast.create({
      message: msg,
      duration: 2500,
      color,
      position: 'top'
    });
    t.present();
  }

  // -----------------------
  // 🔹 Máscara telefone
  // -----------------------
  mascaraTelefone() {
    this.telefone = this.telefone
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .slice(0, 15);
  }

  // -----------------------
  // 🔹 Máscara CPF
  // -----------------------
  mascaraCPF() {
    this.cpf = this.cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{2})$/, '$1-$2')
      .slice(0, 14);
  }

  // -----------------------
  // 🔹 Validação CPF
  // -----------------------
  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0, resto;

    for (let i = 1; i <= 9; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++)
      soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    return resto === parseInt(cpf.substring(10, 11));
  }

  // -----------------------
  // 🔹 Função principal de registro
  // -----------------------
  register() {
    // Validação campos obrigatórios
    if (!this.nome || !this.email || !this.senha) {
      this.showToast('Preencha os campos obrigatórios.');
      return;
    }

    if (!this.email.includes('@') || !this.email.includes('.')) {
      this.showToast('E-mail inválido.');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.showToast('As senhas não coincidem.');
      return;
    }

    if (!this.validarCPF(this.cpf)) {
      this.showToast('CPF inválido.');
      return;
    }

    const dados = {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      cpf: this.cpf,
      data_nascimento: this.data_nascimento,
      senha: this.senha
    };

    // 🔹 Chamar register.php
    this.auth.register(dados).subscribe({
      next: (res: any) => {
        if (res.status === 'sucesso') {
          this.showToast(res.mensagem, 'success');

          // 🔹 Login automático após registro
          this.auth.login({ email: this.email, senha: this.senha }).subscribe({
            next: (loginRes: any) => {
              if (loginRes.status === 'sucesso') {
                localStorage.setItem('user', JSON.stringify(loginRes.usuario));
                this.showToast('Login realizado!', 'success');

                // 🔹 Redirecionar para a página principal
                this.nav.navigateRoot('/home');
              } else {
                this.showToast(loginRes.mensagem);
              }
            },
            error: () => this.showToast('Erro ao conectar para login.')
          });

        } else {
          this.showToast(res.mensagem);
        }
      },
      error: () => this.showToast('Erro ao conectar ao servidor.')
    });
  }

  // -----------------------
  // 🔹 Navegar para login manualmente
  // -----------------------
  irParaLogin() {
    this.nav.navigateForward('/login');
  }
}
