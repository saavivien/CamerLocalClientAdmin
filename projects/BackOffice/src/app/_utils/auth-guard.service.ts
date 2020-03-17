import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { NbAuthService } from '@nebular/auth';
import { tap } from 'rxjs/operators';
import { RoleAuthService } from './role-auth.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private authService: NbAuthService,
    private router: Router,
    private readonly roleAuthService: RoleAuthService) {
  }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    if (route.data.roles && !this.roleAuthService.isAuthorised(route.data.roles)) {
      return false; //unauthorised
    }
    else {
      return true; //authorised
    }
  }
}
