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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const url = this.route.snapshot.url.map(s => s.path).join('/');

    if (url.includes('ver')) this.modo.set('ver');
    else if (url.includes('editar')) this.modo.set('editar');

    if (id) {
      this.clienteService.getCliente(+id).subscribe({
        next: (data) => this.cliente.set(data),
        error: (err) => console.error(err)
      });
    }
  }

  guardar(cliente: Cliente): void {
    this.guardando.set(true);
    const modo = this.modo();

    const operacion = (modo === 'editar' && cliente.id)
      ? this.clienteService.actualizarCliente(cliente.id, cliente)
      : this.clienteService.crearCliente(cliente);

    operacion.subscribe({
      next: () => {
        this.guardando.set(false);
        this.router.navigate(['/cliente']);
      },
      error: (err) => {
        this.guardando.set(false);
        alert(`Error ${err.status}: No se pudo guardar`);
      }
    });
  }

  regresar(): void {
    this.router.navigate(['/cliente']);
  }
}