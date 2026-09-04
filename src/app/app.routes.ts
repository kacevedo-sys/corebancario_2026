import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MonedaComponent } from './components/parametros_generales/moneda/moneda.component';
import { TransaccionComponent } from './components/parametros_operacional/transaccion/transaccion.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'moneda', component: MonedaComponent },
  { path: 'transaccion', component: TransaccionComponent },
  { path: '**', redirectTo: '' }
];