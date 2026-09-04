import { ApplicationConfig, inject, Injectable } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { TranslateLoader, provideTranslateService } from '@ngx-translate/core'; 
import { Observable } from 'rxjs';

import { routes } from './app.routes';

// Loader personalizado que usa inyección moderna y evita el error de los 3 argumentos
@Injectable({ providedIn: 'root' })
export class CustomTranslateLoader implements TranslateLoader {
  private http = inject(HttpClient);
  
  getTranslation(lang: string): Observable<any> {
    // Si tus archivos están en public/i18n/, esta es la ruta correcta
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideTranslateService({ 
      // defaultLanguage fue removido de esta interfaz, lo controlaremos desde el componente
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader // Usamos la clase directamente, sin useFactory ni deps
      }
    })
  ]
};