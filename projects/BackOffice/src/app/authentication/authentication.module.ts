import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbAlertModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule
} from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    AuthenticationRoutingModule,

    NbAuthModule,
  ]
})
export class AuthenticationModule { }
