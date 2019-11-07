import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AdministratorComponent } from './administrator/administrator.component';
import { UsersComponent } from './users.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    UsersComponent,
    AdministratorComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule
  ]
})
export class UsersModule { }
