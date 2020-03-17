import { Component, OnInit } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { RoleAuthService } from '../_utils/role-auth.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {
  public menu: any = MENU_ITEMS;
  constructor(private roleAuthService: RoleAuthService) {

  }
  ngOnInit(): void {

    if (!this.roleAuthService.isAdmin()) {
      this.menu = MENU_ITEMS.filter(m => m.title != 'Users')
    } else {
      this.menu = MENU_ITEMS
    }
  }
}
