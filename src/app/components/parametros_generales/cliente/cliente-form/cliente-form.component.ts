import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { SharedClienteFormComponent } from '../shared-cliente-form/shared-cliente-form.component';
import { ClienteService, Cliente } from '../../../../service/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, TranslatePipe, SharedClienteFormComponent],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss']
})
export class ClienteFormComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  modo = signal<'crear' | 'editar' | 'ver'>('crear');
  cliente = signal<Cliente | null>(null);
  guardando = signal<boolean>(false);
  cargando = signal<boolean>(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    // 1. Detectar el modo según la URL
    const url = this.route.snapshot.url.map(s => s.path).join('/');
    const id = this.route.snapshot.paramMap.get('id');

    if (url.includes('ver')) {
      this.modo.set('ver');
    } else if (url.includes('editar')) {
      this.modo.set('editar');
    } else {
      this.modo.set('crear');
    }

    // 2. Si hay ID, cargar el cliente desde el backend
    if (id) {
      this.cargarCliente(+id);
    }
  }

  cargarCliente(id: number): void {
    this.cargando.set(true);
    this.error.set(null);

    this.clienteService.getCliente(id).subscribe({
      next: (data) => {
        this.cliente.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set(`Error ${err.status}: No se pudo cargar el cliente`);
        this.cargando.set(false);
        console.error(err);
      }
    });
  }

  guardar(cliente: Cliente): void {
    this.guardando.set(true);
    this.error.set(null);

    const modoActual = this.modo();
    let operacion;

    if (modoActual === 'editar' && cliente.clienteId) {
      // ACTUALIZAR (PUT)
      operacion = this.clienteService.actualizarCliente(cliente.clienteId, cliente);
    } else {
      // CREAR (POST) - Quitamos el clienteId si existe para que el backend lo genere
      const { clienteId, fechaRegistro, ...clienteSinId } = cliente;
      operacion = this.clienteService.crearCliente(clienteSinId as Cliente);
    }

    operacion.subscribe({
      next: () => {
        this.guardando.set(false);
        this.router.navigate(['/cliente']);
      },
      error: (err) => {
        this.guardando.set(false);
        const mensaje = err.status === 400
          ? 'Datos inválidos. Verifica los campos.'
          : `Error ${err.status}: No se pudo guardar`;
        this.error.set(mensaje);
        alert(mensaje);
      }
    });
  }

  regresar(): void {
    this.router.navigate(['/cliente']);
  }
}