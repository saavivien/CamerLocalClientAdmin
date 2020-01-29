import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { AdministratorComponent } from './administrator/administrator.component';
import { UsersComponent } from './users.component';
import {
  MatTableModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatSelectModule
}
  from '@angular/material';
import { AdminAddUpdateComponent } from './admin-add-update/admin-add-update.component';
import {
  NbCardModule,
  NbButtonModule,
  NbActionsModule,
  NbCheckboxModule,
  NbIconModule,
  NbSelectModule,
  NbDatepickerModule,
  NbRadioModule,
  NbInputModule

} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    MatSelectModule,
    MatFormFieldModule,
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

    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule { }
