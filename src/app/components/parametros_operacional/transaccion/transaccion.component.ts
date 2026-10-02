import { Component, OnInit } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Cuenta, CuentaService } from '../../../service/cuenta.service';

@Component({
  selector: 'app-transaccion',
  standalone: true,
  imports: [TranslatePipe, CommonModule], // Añade CommonModule para *ngIf, *ngFor
  templateUrl: './transaccion.component.html',
  styleUrls: ['./transaccion.component.scss']
})
export class TransaccionComponent implements OnInit {
  cuentas: Cuenta[] = [];

  constructor(private cuentaService: CuentaService) { }

  ngOnInit(): void {
    this.cuentaService.getCuentas().subscribe({
      next: (data) => {
        this.cuentas = data;
      },
      error: (err) => {
        console.error('Error al cargar las cuentas:', err);
      }
    });
  }
}