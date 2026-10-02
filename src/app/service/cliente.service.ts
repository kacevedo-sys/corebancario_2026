// src/app/service/cliente.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz para tipar los datos del cliente (ajústala a las columnas de tu tabla)
export interface Cliente {
  id: number;
  code: number;
  name: string;
  identification: string;
  email: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  // URL de tu backend en Node.js
  private apiUrl = 'http://localhost:3000/api/cliente';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }
}