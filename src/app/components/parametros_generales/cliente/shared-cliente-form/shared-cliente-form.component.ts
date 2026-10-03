import { Component, EventEmitter, Input, Output, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../../../service/cliente.service';

@Component({
  selector: 'app-shared-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shared-cliente-form.component.html',
  styleUrls: ['./shared-cliente-form.component.scss']
})
export class SharedClienteFormComponent implements OnInit {
  @Input() cliente: Cliente | null = null;
  @Input() modo: 'crear' | 'editar' | 'ver' = 'crear';
  @Input() guardando: boolean = false;

  @Output() guardar = new EventEmitter<Cliente>();

  model = signal<Cliente>({
    nombre: '', apellido: '', dpi: '', email: '',
    telefono: '', direccion: '', fechaNacimiento: ''
  });

  submitted = signal<boolean>(false);

  ngOnInit(): void {
    if (this.cliente) {
      this.model.set({ ...this.cliente });
    }
  }

  get soloLectura(): boolean {
    return this.modo === 'ver';
  }

  onSubmit(): void {
    this.submitted.set(true);
    const m = this.model();

    if (!m.nombre || !m.apellido || !m.dpi) {
      return;
    }
    this.guardar.emit(m);
  }

  onFieldChange(field: keyof Cliente, value: any): void {
    this.model.update(m => ({ ...m, [field]: value }));
  }
}