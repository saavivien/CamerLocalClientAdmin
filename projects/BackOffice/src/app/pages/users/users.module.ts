import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AdministratorComponent } from './administrator/administrator.component';
import { UsersComponent } from './users.component';
import {
  MatTableModule,
  MatButtonModule,
  MatIconModule
}
  from '@angular/material';
import { AdminAddUpdateComponent } from './admin-add-update/admin-add-update.component';
import {
  NbCardModule,
  NbDialogModule,
  NbWindowModule,
  NbButtonModule,
  NbActionsModule,
  NbCheckboxModule,
  NbIconModule,
  NbSelectModule,
  NbDatepickerModule,
  NbRadioModule,
  NbInputModule
} from '@nebular/theme';
import { FormsRoutingModule } from '../../../../../../src/app/pages/forms/forms-routing.module';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [
    UsersComponent,
    AdministratorComponent,
    AdminAddUpdateComponent
  ],
  entryComponents: [
    AdminAddUpdateComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    NbCardModule,

    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
  ],
})
export class UsersModule { }
