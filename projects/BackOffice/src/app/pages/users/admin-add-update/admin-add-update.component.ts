import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { MustMatch } from '../../../_utils/must-match.validator';
import { BaseService } from '../../../services/base.service';
import { RoleResult, RoleModel } from '../../../models/role.model';
import { UserResult, UserResource, UserModel } from '../../../models/user.model';

@Component({
  selector: 'ngx-admin-add-update',
  templateUrl: './admin-add-update.component.html',
  styleUrls: ['./admin-add-update.component.scss']
})
export class AdminAddUpdateComponent implements OnInit {
  private adminForm: FormGroup;
  private titles: any = ['Mr', 'Ms', 'Mrs'];
  private roles: RoleModel[];

  namePattern = /^([a-zA-Z]+)(?=\D*\d*)[A-Za-z\d\s!$%@#£€*?&-éçèùê]{1,}$/
  passwordPattern = /^([a-zA-Z]+)(?=\D*\d*)[A-Za-z\d\s!$%@#£€*?&-éçèùê]{2,}$/
  PhonePattern = /^(\+\d{1,3}[- ]?)?\d{10}$/

  constructor(
    protected ref: NbDialogRef<AdminAddUpdateComponent>,
    private formBuilder: FormBuilder,
    private repoService: BaseService) {
    this.createForm();
    this.getAllRoles();
  }

  ngOnInit() {
  }
  cancel() {
    this.ref.close();
  }
  public getAllRoles = () => {
    this.repoService.getData('api/role')
      .subscribe((res: RoleResult) => {
        this.roles = res._embedded.roleResourceList.map(r => r.role);
      })
  }
  public submitAdminData() {

    let user: UserModel;
    user = <UserModel>this.adminForm.value;
    this.repoService.create('api/user', user).subscribe((ur: UserResource) => {
      console.log('user' + ur.user.firstName + 'succesfully created');
    });
  }
  // reactive form building
  createForm() {
    this.adminForm = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
      // lastname
      name: ['', [Validators.required, Validators.pattern(this.namePattern)]],

      phone1: ['', [Validators.required, Validators.pattern(this.PhonePattern)]],
      phone2: ['', Validators.pattern(this.PhonePattern)],

      email: ['', [Validators.required, Validators.email]],
      confirmedEmail: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.passwordPattern)]],
      confirmedPassword: ['', [Validators.required, Validators.minLength(4), Validators.pattern(this.passwordPattern)]],
      roles: [[]]
    }, {
      validator: [MustMatch('password', 'confirmedPassword'), MustMatch('email', 'confirmedEmail')]
    });
  }
  // Accessing form control using getters
  // get title() {
  //   return this.adminForm.get('title');
  // }
  // get firstname() {
  //   return this.adminForm.get('firstname');
  // }
  // get lastname() {
  //   return this.adminForm.get('lastname');
  // }
  // get phone1() {
  //   return this.adminForm.get('phone1');
  // }
  // get phone2() {
  //   return this.adminForm.get('phone2');
  // }
  // get email() {
  //   return this.adminForm.get('email');
  // }
  // get password() {
  //   return this.adminForm.get('password');
  // }
  // convenience getter for easy access to form fields
  get f() { return this.adminForm.controls; }

}
