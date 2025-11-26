import { Component } from '@angular/core';
import { PaisesService } from './paises.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular'; 

@Component({
  selector: 'app-paises',
  templateUrl: './paises.page.html',
  styleUrls: ['./paises.page.scss'],
})
export class PaisesPage {
  countryName: string = '';
  countryInfo: any;
  errorMessage: string | null = null;

  constructor(private countryService: PaisesService, private navController: NavController) {} 

  // Limpa a mensagem de erro ao alterar o input
  onInputChange() {
    this.errorMessage = null; 
  }

  // Pesquisa o país por nome em português
  searchCountry() {
    this.countryService.getCountryByName(this.countryName).subscribe(
      (data: any) => {
        this.countryInfo = data[0]; // Armazena as informações do primeiro resultado
        this.errorMessage = null;
      },
      (error: HttpErrorResponse) => {
        this.countryInfo = null;
        this.errorMessage = 'País não encontrado. Tente novamente.';
      }
    );
  }

  // Função para exibir a moeda em português
  getCurrency() {
    if (this.countryInfo && this.countryInfo.currencies) {
      const currencyKey = Object.keys(this.countryInfo.currencies)[0];
      return this.countryInfo.currencies[currencyKey]; // Exibe a moeda
    }
    return null;
  }

  // Função para voltar para a página anterior
  goBack() {
    this.navController.pop();
  }
}
