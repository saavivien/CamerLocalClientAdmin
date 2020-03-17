import { Injectable } from '@angular/core';
import { RoleModel, RoleName } from '../_models/role.model';
import { NbAuthService, NbAuthOAuth2JWTToken } from '@nebular/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleAuthService {
  private connectedUser: any;
  private connectedUserRoles: RoleName[];
  private guardValue: boolean = false;

  constructor(
    private authService: NbAuthService,
    private router: Router
  ) { }

  public isAuthorised(roles: RoleName[]): boolean {
    (this.authService.getToken().pipe(
      map((token: NbAuthOAuth2JWTToken) => {
        if (token && token.isValid()) {
          this.connectedUser = token.getAccessTokenPayload(); // here we receive a payload from the token and assigns it to our `user` variable 
          this.connectedUserRoles = this.connectedUser.role.map(r => r.roleName);
          return this.CheckOneCommunValue(this.connectedUserRoles, roles);
        }
        else {
          // user not authenticated redirect to login page
          this.router.navigate(['auth/login']);
          return false;
        }
      })
    )).subscribe(bool => {
      if (!bool) {
        this.guardValue = false;
      }
      else {
        this.guardValue = true; //authorised
      }
    })
    return this.guardValue;
  }

  private CheckOneCommunValue(tab1: RoleName[], tab2: RoleName[]): boolean {
    for (let i = 0; i < tab1.length; i++) {
      if (tab2.indexOf(tab1[i]) !== -1) {
        return true;
      }
    }
    return false;
  }

  public isAdmin(): boolean {
    return this.isAuthorised([RoleName.admin]);
  }

  public isAgent(): boolean {
    return this.isAuthorised([RoleName.agent]);
  }
  public isClient(): boolean {
    return this.isAuthorised([RoleName.client]);
  }
}

