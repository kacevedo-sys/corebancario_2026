import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MonedaComponent } from './components/moneda/moneda.component';
import { TransaccionComponent } from './components/transaccion/transaccion.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'moneda', component: MonedaComponent },
  { path: 'transaccion', component: TransaccionComponent },
  { path: '**', redirectTo: '' }
];