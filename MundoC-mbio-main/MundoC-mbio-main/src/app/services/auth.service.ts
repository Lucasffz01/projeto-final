import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost/MundoC_db'; // ajuste só se mudar a pasta

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register.php`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login.php`, data);
  }
   // Pegar usuário logado
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Verifica se está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // Logout
  logout() {
    localStorage.removeItem('user');
  }
}
