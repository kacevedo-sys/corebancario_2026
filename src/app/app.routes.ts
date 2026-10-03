import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MonedaComponent } from './components/parametros_generales/moneda/moneda.component';
import { TransaccionComponent } from './components/parametros_operacional/transaccion/transaccion.component';
import { ClienteMainComponent } from './components/parametros_generales/cliente/cliente-main/cliente-main.component';
import { ClienteFormComponent } from './components/parametros_generales/cliente/cliente-form/cliente-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'moneda', component: MonedaComponent },
  { path: 'cliente', component: ClienteMainComponent },
  { path: 'cliente/nuevo', component: ClienteFormComponent },
  { path: 'cliente/editar/:id', component: ClienteFormComponent },
  { path: 'cliente/ver/:id', component: ClienteFormComponent },
  { path: 'transaccion', component: TransaccionComponent },
  { path: '**', redirectTo: '' }
];