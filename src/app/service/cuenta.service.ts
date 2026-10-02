import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para tipar los datos de la cuenta (ajústala a las columnas de tu tabla)
export interface Cuenta {
  id: number;
  numero: string;
  titular: string;
  saldo: number;
}

@Injectable({
  providedIn: 'root'
})
export class CuentaService {
  // URL de tu backend en Node.js
  private apiUrl = 'http://localhost:3000/api/cuenta';

  constructor(private http: HttpClient) { }

  getCuentas(): Observable<Cuenta[]> {
    return this.http.get<Cuenta[]>(this.apiUrl);
  }
}