import { ApplicationConfig, inject, Injectable } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { TranslateLoader, provideTranslateService } from '@ngx-translate/core'; 
import { provideAnimations } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';

import { routes } from './app.routes';

@Injectable({ providedIn: 'root' })
export class CustomTranslateLoader implements TranslateLoader {
  private http = inject(HttpClient);
  
  getTranslation(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`);
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideTranslateService({ 
      loader: {
        provide: TranslateLoader,
        useClass: CustomTranslateLoader
      }
    })
  ]
};