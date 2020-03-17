import { Component, OnInit } from '@angular/core';
// import { NbDialogService } from '@nebular/theme';
import { BaseService } from '../../../_services/base.service';
import { AdminAddUpdateComponent } from '../admin-add-update/admin-add-update.component';
import { UserResult, UserModel } from '../../../_models/user.model';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'ngx-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  displayedColumns: string[] = ['title', 'name', 'firstName', 'phone1', 'phone2', 'email', 'creationDate', 'actions'];
  // public dataSource = new MatTableDataSource<UserModel>();
  private users: UserModel[];
  constructor(
    private repoService: BaseService,
    // private dialogService: NbDialogService,
    private router: Router) { }

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers = () => {
    this.repoService.getData('api/user')
      .subscribe((res: UserResult) => {
        this.users = res._embedded.userResourceList.map(u => u.user);
      })
  }
  redirectToView(id: number) {
    this.router.navigate(['pages/users/admin_edition', { id: id }])
    // this.dialogService.open(AdminAddUpdateComponent, { hasBackdrop })
    // .onClose.subscribe(name => name && this.names.push(name));
  }
  redirectToCreate() {
    this.router.navigate(['pages/users/admin_edition'])
  }


  // public redirectToDetails = (id: string) => {

  // }

  // public redirectToUpdate = (id: string) => {

  // }

  // public redirectToDelete = (id: string) => {

  // }
}
