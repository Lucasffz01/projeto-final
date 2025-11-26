import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  exchangeRates: any;
  baseCurrency: string = 'BRL'; 
  amount: number | undefined; 
  targetCurrency: string | undefined; 
  conversionResult: number | undefined; 
  errorMessage: string | undefined; 

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.loadExchangeRates();
  }

  loadExchangeRates() {
    this.currencyService.getExchangeRates(this.baseCurrency).subscribe(
      data => {
        this.exchangeRates = data.conversion_rates;
      },
      error => {
        console.error('Erro ao buscar as taxas de câmbio', error);
        this.errorMessage = 'Erro ao carregar taxas de câmbio'; 
      }
    );
  }

  convert() {
    this.errorMessage = ''; 
    if (this.targetCurrency && this.amount) {
      this.currencyService.convertCurrency(this.amount, this.baseCurrency, this.targetCurrency).subscribe(
        result => {
          this.conversionResult = result; 
        },
        error => {
          console.error('Erro ao converter moeda', error);
          this.errorMessage = 'Erro ao realizar a conversão'; 
        }
      );
    }
  }
}
