// src/app/moneda/moneda.component.ts
import { Component, inject, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { BackendService } from '../../../service/backend.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moneda',
  standalone: true,
  imports: [TranslatePipe, CommonModule],
  templateUrl: './moneda.component.html',
  styleUrls: ['./moneda.component.scss']
})
export class MonedaComponent implements OnInit {
  private backendService = inject(BackendService);

  respuesta = signal<string>('');
  cargando = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.consumirBackend();
  }

  consumirBackend(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.backendService.getBackendPrueba().subscribe({
      next: (data) => {
        this.respuesta.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        console.error('Error al consumir el backend:', err);
        this.error.set(`Error ${err.status}: ${err.message}`);
        this.cargando.set(false);
      }
    });
  }
}