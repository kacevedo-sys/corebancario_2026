// src/app/components/sidebar/sidebar.component.ts
import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  private keycloak = inject(Keycloak);

  menuItems = [
    {
      title: 'PARAMETROS_GENERALES',
      icon: 'settings',
      children: [
        { title: 'MONEDA', path: '/moneda', icon: 'attach_money' },
        { title: 'CLIENTE', path: '/cliente', icon: 'attach_money' }
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

  // === Datos del usuario desde Keycloak ===

  userName = computed(() => {
    const token = this.keycloak.tokenParsed;
    if (!token) return 'Usuario';
    const fullName = token['name']
      || `${token['given_name'] ?? ''} ${token['family_name'] ?? ''}`.trim()
      || token['preferred_username']
      || 'Usuario';
    return fullName;
  });

  /** Iniciales para el avatar (ej. "Kevin Acevedo" → "KA") */
  userInitials = computed(() => {
    const name = this.userName();
    return name
      .split(' ')
      .filter((p: any) => p.length > 0)
      .slice(0, 2)
      .map((p: any) => p[0].toUpperCase())
      .join('');
  });

  userRole = computed(() => {
    const token = this.keycloak.tokenParsed;
    const roles: string[] = token?.['roles'] ?? [];
    const relevantRole = roles.find(r =>
      !r.startsWith('default-roles-') &&
      r !== 'offline_access' &&
      r !== 'uma_authorization'
    );
    return relevantRole ?? 'Usuario';
  });

  // === Lógica del menú ===

  toggleMenu(title: string) {
    this.expandedMenus[title] = !this.expandedMenus[title];
  }

  isExpanded(title: string): boolean {
    return this.expandedMenus[title] || false;
  }

  // === Logout ===

  logout(): void {
    this.keycloak.logout({
      redirectUri: window.location.origin
    });
  }
}