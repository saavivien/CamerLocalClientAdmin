import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { UserModel, Result } from '../user.model';
import { BaseService } from '../../../services/base.service';
import { AdminAddUpdateComponent } from '../admin-add-update/admin-add-update.component';

@Component({
  selector: 'ngx-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  displayedColumns: string[] = ['title', 'name', 'firstName', 'phone1', 'phone2', 'email', 'creationDate', 'actions'];
  // public dataSource = new MatTableDataSource<UserModel>();
  private dataSource: UserModel[];
  constructor(
    private repoService: BaseService,
    private dialogService: NbDialogService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers = () => {
    this.repoService.getData('api/user')
      .subscribe((res: Result) => {
        this.dataSource = res._embedded.userResourceList.map(u => u.user);
      })
  }
  redirectToUpdate(id: number, hasBackdrop: boolean) {
    this.dialogService.open(AdminAddUpdateComponent, { hasBackdrop })
    // .onClose.subscribe(name => name && this.names.push(name));
  }

  // public redirectToDetails = (id: string) => {

  // }

  // public redirectToUpdate = (id: string) => {

  // }

  // public redirectToDelete = (id: string) => {

  // }
}
