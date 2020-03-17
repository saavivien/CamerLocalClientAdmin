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
  public menu: any;
  constructor(private roleAuthService: RoleAuthService) {

  }
  ngOnInit(): void {
    this.menu = MENU_ITEMS;
    // hide some menu according to the role of connected user
    for (let i = 0; i < this.menu.length; i++) {
      if (this.menu[i].title == 'Users') {
        if (!this.roleAuthService.isAdmin()) {
          this.menu[i].children[0].hidden = true;
        } else {
          this.menu[i].children[0].hidden = false;
        }
        return;
      }
    }
  }
}
