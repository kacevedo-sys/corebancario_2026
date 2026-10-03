import { Component, EventEmitter, Input, Output, OnInit, OnChanges, SimpleChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { Cliente } from '../../../../service/cliente.service';

@Component({
  selector: 'app-shared-cliente-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './shared-cliente-form.component.html',
  styleUrls: ['./shared-cliente-form.component.scss']
})
export class SharedClienteFormComponent implements OnInit, OnChanges {
  @Input() cliente: Cliente | null = null;
  @Input() modo: 'crear' | 'editar' | 'ver' = 'crear';
  @Input() guardando: boolean = false;

  @Output() guardar = new EventEmitter<Cliente>();

  // Modelo inicializado
  model = signal<Cliente>({
    dpi: '',
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    estado: 'ACTIVO'
  });

  submitted = signal<boolean>(false);

  ngOnInit(): void {
    if (this.cliente) {
      this.cargarModelo(this.cliente);
    }
  }

  // Detecta cuando el @Input cliente cambia (llega async desde el backend)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cliente'] && changes['cliente'].currentValue) {
      this.cargarModelo(changes['cliente'].currentValue);
    }
  }

  private cargarModelo(cliente: Cliente): void {
    // Copia profunda para no mutar el objeto original
    const copia: Cliente = { ...cliente };

    // Normalizar fechaNacimiento para el input type="date" (formato YYYY-MM-DD)
    if (copia.fechaNacimiento) {
      // Si viene con hora o formato ISO completo, lo cortamos
      copia.fechaNacimiento = String(copia.fechaNacimiento).substring(0, 10);
    } else {
      copia.fechaNacimiento = '';
    }

    this.model.set(copia);
  }

  get soloLectura(): boolean {
    return this.modo === 'ver';
  }

  get tituloBoton(): string {
    return this.guardando
      ? 'CLIENTES.FORM.GUARDANDO'
      : 'CLIENTES.FORM.GUARDAR';
  }

  onSubmit(): void {
    this.submitted.set(true);
    const m = this.model();

    // Validaciones básicas
    if (!m.nombres || !m.apellidos || !m.dpi) {
      return;
    }

    // Emitir el modelo al padre
    this.guardar.emit(m);
  }

  onFieldChange(field: keyof Cliente, value: any): void {
    this.model.update(m => ({ ...m, [field]: value }));
  }
}