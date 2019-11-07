import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UserModel, Result } from '../user.model';
import { BaseService } from '../../../services/base.service';

@Component({
  selector: 'ngx-administrator',
  templateUrl: './administrator.component.html',
  styleUrls: ['./administrator.component.scss']
})
export class AdministratorComponent implements OnInit {

  displayedColumns: string[] = ['title', 'name', 'firstName', 'phone1', 'phone2', 'email', 'creationDate'];
  // public dataSource = new MatTableDataSource<UserModel>();
  private dataSource: UserModel[];
  constructor(private repoService: BaseService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  public getAllUsers = () => {
    this.repoService.getData('api/user')
      .subscribe((res: Result) => {
        this.dataSource = res._embedded.userResourceList.map(u => u.user);
        console.log("+++++++++++++++++++++++++++" + this.dataSource + "+++++++++++++++++")
      })
  }

  // public redirectToDetails = (id: string) => {

  // }

  // public redirectToUpdate = (id: string) => {

  // }

  // public redirectToDelete = (id: string) => {

  // }
}
