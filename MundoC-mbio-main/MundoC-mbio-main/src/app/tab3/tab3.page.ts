import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../services/currency.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  availableCurrencies: { code: string, name: string }[] = [];

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.loadAvailableCurrencies(); 
  }

  loadAvailableCurrencies() {
    this.currencyService.getAllCurrencies().subscribe( 
      data => {
        this.availableCurrencies = data; 
      },
      error => {
        console.error('Erro ao carregar moedas disponíveis', error);
      }
    );
  }
}
