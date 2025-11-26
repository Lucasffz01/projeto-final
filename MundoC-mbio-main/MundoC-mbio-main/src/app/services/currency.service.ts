import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiKey = '62b1e56dc7c7b8f1b1d5ff6f'; 
  private apiUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/`; 

  constructor(private http: HttpClient) {}

  getExchangeRates(baseCurrency: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${baseCurrency}`);
  }

  convertCurrency(amount: number, fromCurrency: string, toCurrency: string): Observable<any> {
    return this.getExchangeRates(fromCurrency).pipe(
      map(rates => {
        const rate = rates.conversion_rates[toCurrency];
        return amount * rate;
      })
    );
  }

  
  getAllCurrencies(): Observable<any> {
    return this.getExchangeRates('BRL').pipe(
      map(data => {
        return Object.keys(data.conversion_rates).map(key => ({
          code: key,
          name: this.getCurrencyName(key)
        }));
      })
    );
  }

  
  private getCurrencyName(code: string): string {
    const currencyNames: { [key: string]: string } = {
      EUR: 'Euro',
      USD: 'Dólar Americano',
      BRL: 'Real Brasileiro',
      AED: 'Dirham dos Emirados Árabes Unidos',
      ALL: 'Lek Albanês',
      ANG: 'Florim Holandês',
      AOA: 'Kwanza Angolano',
      ARS: 'Peso Argentino',
      AWG: 'Florim de Aruba',
      AZN: 'Manat do Azerbaijão',
      BAM: 'Marco Convertível (Bósnia)',
      BBD: 'Dólar de Barbados',
      BDT: 'Taka (Bangladesh)',
      BGN: 'Lev Búlgaro',
      BHD: 'Dinar do Bahrein',
      BIF: 'Franco do Burundi',
      BMD: 'Dólar Bermudense',
      BND: 'Dólar do Brunei',
      BOB: 'Boliviano',
      BSD: 'Dólar das Bahamas',
      BTN: 'Ngultrum (Butão)',
      BWP: 'Pula (Botswana)',
      BYN: 'Rublo Bielorrusso',
      BZD: 'Dólar do Belize',
      CDF: 'Franco Congolês',
      CLP: 'Peso Chileno',
      CZK: 'Coroa Tcheca', 
      COP: 'Peso Colombiano',
      CRC: 'Colon da Costa Rica',
      CUP: 'Peso Cubano',
      CVE: 'Escudo Cabo-verdiano',
      DJF: 'Franco do Djibuti',
      DKK: 'Coroa dinamarquesa',
      DOP: 'Peso (República Dominicana)',
      DZD: 'Dinar Argelino',
      EGP: 'Libra Egípcia',
      ERN: 'Nakfa (Eritreia)',
      ETB: 'Birr Etíope',
      FJD: 'Dólar das Fiji',
      FKP: 'Libra das Malvinas',
      FOK: 'Coroa das Ilhas Faroé',
      GEL: 'Lari (Geórgia)',
      GGP: 'Libra de Guernsey',
      GIP: 'Libra de Gibraltar',
      GMD: 'Dalasi (Gâmbia)',
      GNF: 'Franco da Guiné',
      GHS: 'Cedi (Gana)',
      AMD: 'Dram Armênio',
      GBP: 'Libra Esterlina',
      JPY: 'Iene Japonês',
      AUD: 'Dólar Australiano',
      CAD: 'Dólar Canadense',
      CHF: 'Franco Suíço',
      CNY: 'Yuan Chinês',
      SEK: 'Coroa Sueca',
      NZD: 'Dólar Neozelandês',
      MXN: 'Peso Mexicano',
      SGD: 'Dólar de Singapura',
      HKD: 'Dólar de Hong Kong',
      NOK: 'Coroa Norueguesa',
      INR: 'Rúpia Indiana',
      RUB: 'Rublo Russo',
      ZAR: 'Rand Sul-Africano',
     
    };
    return currencyNames[code] || code;
  }
}
