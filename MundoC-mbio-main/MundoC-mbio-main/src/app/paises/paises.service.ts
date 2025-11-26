import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private apiUrl = 'https://restcountries.com/v3.1/name/';

  constructor(private http: HttpClient) { }

  getCountryByName(countryName: string): Observable<any> {
    // Adiciona o parâmetro para retornar os dados em português
    return this.http.get<any>(`${this.apiUrl}${countryName}?lang=pt`);
  }
}
