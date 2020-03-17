import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { AdminAddUpdateComponent } from './admin-add-update/admin-add-update.component';
import { RoleName } from '../../_models/role.model';
import { AuthGuardService } from '../../_utils/auth-guard.service';

const routes: Routes = [{
  path: '',
  component: UsersComponent,
  children: [
    {
      path: 'admin',
      component: AdministratorComponent,
    },
    {
      path: 'admin_edition',
      component: AdminAddUpdateComponent,
    },
    {
      path: 'admin_edition/:id',
      component: AdminAddUpdateComponent,
    }
  ],
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
