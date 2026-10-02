// src/app/services/backend.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackendService {
  private http = inject(HttpClient);
  
  // Usamos /api que será redirigido por el proxy
  private readonly apiUrl = '/api';

  /**
   * Consume el endpoint de prueba del backend
   * GET /backend-prueba
   */
  getBackendPrueba(): Observable<string> {
    return this.http.get(`${this.apiUrl}/backend-prueba`, {
      responseType: 'text' // Porque el backend devuelve text/plain
    });
  }
}