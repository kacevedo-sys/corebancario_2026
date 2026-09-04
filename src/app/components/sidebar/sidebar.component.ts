import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  menuItems = [
    {
      title: 'PARAMETROS_GENERALES',
      icon: 'settings',
      children: [
        { title: 'MONEDA', path: '/moneda', icon: 'attach_money' }
      ]
    },
    {
      title: 'PARAMETROS_OPERACIONALES',
      icon: 'build',
      children: [
        { title: 'TRANSACCION', path: '/transaccion', icon: 'swap_horiz' }
      ]
    },
    {
      title: 'ATENCION_CLIENTE',
      icon: 'support_agent',
      children: [
        { title: 'INICIO', path: '/', icon: 'home' }
      ]
    }
  ];

  expandedMenus: { [key: string]: boolean } = {};

  toggleMenu(title: string) {
    this.expandedMenus[title] = !this.expandedMenus[title];
  }

  isExpanded(title: string): boolean {
    return this.expandedMenus[title] || false;
  }
}