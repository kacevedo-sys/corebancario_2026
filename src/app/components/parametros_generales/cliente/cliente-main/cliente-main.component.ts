import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { ClienteService, Cliente } from '../../../../service/cliente.service';

@Component({
  selector: 'app-cliente-main',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './cliente-main.component.html',
  styleUrls: ['./cliente-main.component.scss']
})
export class ClienteMainComponent implements OnInit {
  private clienteService = inject(ClienteService);
  private router = inject(Router);

  clientes = signal<Cliente[]>([]);
  cargando = signal<boolean>(false);
  error = signal<string | null>(null);
  filtro = signal<string>('');

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.clienteService.getClientes().subscribe({
      next: (data) => {
        this.clientes.set(data);
        this.cargando.set(false);
      },
      error: (err) => {
        this.error.set(`Error ${err.status}: No se pudo cargar la lista`);
        this.cargando.set(false);
      }
    });
  }

  get clientesFiltrados(): Cliente[] {
    const termino = this.filtro().toLowerCase();
    if (!termino) return this.clientes();
    return this.clientes().filter(c =>
      c.nombre.toLowerCase().includes(termino) ||
      c.apellido.toLowerCase().includes(termino) ||
      c.dpi.toLowerCase().includes(termino) ||
      c.email.toLowerCase().includes(termino)
    );
  }

  onFiltroChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.filtro.set(value);
  }

  agregar(): void {
    this.router.navigate(['/cliente/nuevo']);
  }

  editar(cliente: Cliente): void {
    this.router.navigate(['/cliente/editar', cliente.id]);
  }

  ver(cliente: Cliente): void {
    this.router.navigate(['/cliente/ver', cliente.id]);
  }

  eliminar(cliente: Cliente): void {
    if (!cliente.id) return;
    if (!confirm(`¿Eliminar a ${cliente.nombre} ${cliente.apellido}?`)) return;

    this.clienteService.eliminarCliente(cliente.id).subscribe({
      next: () => this.cargarClientes(),
      error: (err) => this.error.set(`Error ${err.status}: No se pudo eliminar`)
    });
  }
}