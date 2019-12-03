import { Component, OnInit, Inject } from '@angular/core';
import {
  NbAuthResult,
  NbAuthToken,
  NbAuthService,
  NB_AUTH_OPTIONS,
  getDeepFromObject,
  nbAuthCreateToken,
  NbAuthJWTToken,
  NbAuthOAuth2JWTToken
} from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  token: NbAuthOAuth2JWTToken;
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = '';

  errors: string[] = [];
  messages: string[] = [];
  user: any = {};
  submitted: boolean = false;

  constructor(private authService: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router) {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    /**this.authService.onTokenChange()
      .subscribe((token: NbAuthOAuth2Token) => {
        this.token = null;
        if (token && token.isValid()) {
          this.token = token;
        }
      }); **/
  }

  login(): void {

    this.errors = this.messages = [];
    this.submitted = true;

    this.authService.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;
      if (result.isSuccess()) {
        this.token = <NbAuthOAuth2JWTToken>result.getToken();
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }
      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }


  logout() {
    this.authService.logout('myAuthStrategy')
      .subscribe((authResult: NbAuthResult) => {
        this.token = null;
      });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  getClaims(rawToken: string): string {
    if (!rawToken) {
      return null;
    }
    return nbAuthCreateToken(NbAuthJWTToken, rawToken, this.strategy).getPayload();
  }
}
