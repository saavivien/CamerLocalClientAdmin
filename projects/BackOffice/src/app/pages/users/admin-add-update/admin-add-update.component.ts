import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
// import { NbDi:alogRef } from '@nebular/theme';
import { MustMatch } from '../../../_utils/must-match.validator';
import { BaseService } from '../../../_services/base.service';
import { RoleResult, RoleModel } from '../../../_models/role.model';
import { UserResource, UserModel } from '../../../_models/user.model';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router'
import { NbAuthService, NbAuthResult, NbAuthOAuth2JWTToken } from '@nebular/auth';
import { RoleAuthService } from '../../../_utils/role-auth.service';

@Component({
  selector: 'ngx-admin-add-update',
  templateUrl: './admin-add-update.component.html',
  styleUrls: ['./admin-add-update.component.scss']
})
export class AdminAddUpdateComponent implements OnInit {
  private adminForm: FormGroup;
  private titles: any = ['Mr', 'Ms', 'Mrs'];
  private rolesList: RoleModel[];
  private id: Number;
  private editable: boolean;
  private connectedUser: any;
  private pageTitle: String;
  private isAdmin: boolean;
  //image
  private selectedImageFile: File;
  private imageUrl: any;

  namePattern = /^([a-zA-Z]+)(?=\D*\d*)[A-Za-z\d\s!$%@#£€*?&-éçèùê]{1,}$/
  passwordPattern = /^([a-zA-Z]+)(?=\D*\d*)[A-Za-z\d\s!$%@#£€*?&-éçèùê]{2,}$/
  PhonePattern = /^(\+\d{1,3}[- ]?)?\d{10}$/

  constructor(
    // protected ref: NbDialogRef<AdminAddUpdateComponent>,
    private formBuilder: FormBuilder,
    private repoService: BaseService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private authService: NbAuthService,
    private roleAuthService: RoleAuthService
  ) {
    this.getAllRoles();
  }

  ngOnInit() {
    this.authService.getToken()
      .subscribe((token: NbAuthOAuth2JWTToken) => {
        if (token.isValid()) {
          this.connectedUser = token.getAccessTokenPayload(); // here we receive a payload from the token and assigns it to our `user` variable 
        }
      });

    this.route.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.pageTitle = "User Information";
        this.createForm();
        this.editable = false;
        this.repoService.getData('api/user', params.id).subscribe((res: UserResource) => {
          this.setFormValue(res.user);
          this.imageUrl = res.image;
        })
      }
      else {
        this.id = null;
        this.pageTitle = "New User";
        this.editable = true;
        this.createForm();
      }
    })
    this.isAdmin = this.roleAuthService.isAdmin();
  }

  public getAllRoles = () => {
    this.repoService.getData('api/role')
      .subscribe((res: RoleResult) => {
        this.rolesList = res._embedded.roleResourceList.map(r => r.role);
      })
  }
  public submitAdminData() {
    let user: UserModel;
    user = <UserModel>this.adminForm.value;
    const formData = new FormData();
    if (this.id) {
      user.id = this.id;
      formData.append("user", JSON.stringify(user));
      //if the image has been changed
      if (this.selectedImageFile) {
        formData.append("image", this.selectedImageFile);
      }

      this.repoService.updateUserWithProfile('api/user/userprofile', formData, this.id).subscribe((ur: UserResource) => {
        console.log('user' + ur.user.firstName + 'succesfully updated');
        //if the user edited is the connected user, he will have to login again since he can edit his email
        if (this.id == this.connectedUser.userId) {
          this.authService.logout('myAuthStrategy')
            .subscribe((authResult: NbAuthResult) => {
              return this.router.navigate(['/auth/login']);
            });
        }
        else {
          this.router.navigate(['pages/users/admin'])
        }
      });
    }
    else {
      formData.append("user", JSON.stringify(user));
      formData.append("image", this.selectedImageFile);
      this.repoService.createUserWithProfile('api/user/userprofile', formData).subscribe((ur: UserResource) => {
        console.log('user' + ur.user.firstName + 'succesfully created');
        this.router.navigate(['pages/users/admin'])
      });
    }
  }
  // reactive form building
  createForm() {
    if (this.id) {
      this.adminForm = this.formBuilder.group({
        title: ['', Validators.required],
        firstName: ['', [Validators.required, Validators.pattern(this.namePattern)]],
        // lastname
        name: ['', [Validators.required, Validators.pattern(this.namePattern)]],

        phone1: ['', [Validators.required, Validators.pattern(this.PhonePattern)]],
        phone2: ['', Validators.pattern(this.PhonePattern)],

        email: ['', [Validators.required, Validators.email]],
        confirmedEmail: ['', [Validators.required, Validators.email]],

        roles: [[], Validators.required]
      }, {
        validator: [MustMatch('email', 'confirmedEmail')]
      });
    }
    else {
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
        roles: [[], Validators.required]
      }, {
        validator: [MustMatch('password', 'confirmedPassword'), MustMatch('email', 'confirmedEmail')]
      });
    }
  }

  //Make the form editable
  edit() {
    this.editable = true;
    this.pageTitle = "User Edition";
  }

  setFormValue(u: UserModel) {
    this.adminForm.setValue({
      title: u.title,
      firstName: u.firstName,
      name: u.name,

      phone1: u.phone1,
      phone2: u.phone2,

      email: u.email,
      confirmedEmail: u.email,

      roles: u.roles,
    })
  }
  compare(r1: RoleModel, r2: RoleModel) {
    return r1 && r2 ?
      (r1.displayedName === r2.displayedName && r1.id === r2.id && r1.roleName === r2.roleName)
      : r1 === r2
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
  public get f() { return this.adminForm.controls; }

  cancle() {
    this.goBack();
  }
  goBack() {
    this.location.back();
  }


  //file handling
  onSelectFile(event) {
    this.selectedImageFile = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.selectedImageFile);
    reader.onload = () => {
      this.imageUrl = reader.result;
    }
  }
}
