/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import {
  MatTableModule,
  MatButtonModule,
  MatIconModule,
}
  from '@angular/material';
import { PagesModule } from './pages/pages.module';
import { CamerLocalInterceptor } from './_utils/app.interceptor';
import {
  NbAuthModule,
  NbOAuth2AuthStrategy,
  NbOAuth2GrantType,
  NbOAuth2ClientAuthMethod,
  NbAuthOAuth2JWTToken
} from '@nebular/auth';
import * as CamerLocalUtils from './_utils/camer.local.utils';
import { AuthGuardService } from './_utils/auth-guard.service';


const formSetting: any = {
  redirectDelay: 0,
  showMessages: {
    error: true,
    success: true,
  },
  strategy: 'myAuthStrategy',
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    PagesModule,

    ThemeModule.forRoot(),

    MatButtonModule,
    MatIconModule,
    MatTableModule,

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),

    // configuring a strategy
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'myAuthStrategy',
          baseEndpoint: CamerLocalUtils.BACKEND_API_ROOT_URL,
          clientId: CamerLocalUtils.CLIENT_ID,
          clientSecret: CamerLocalUtils.CLIENT_SECRET,
          clientAuthMethod: NbOAuth2ClientAuthMethod.BASIC,

          token: {
            endpoint: '/oauth/token',
            grantType: NbOAuth2GrantType.PASSWORD,
            class: NbAuthOAuth2JWTToken,
            requireValidToken: true,
          },
          refresh: {
            endpoint: 'token',
            grantType: NbOAuth2GrantType.REFRESH_TOKEN,
            requireValidToken: true,
          },
          redirect: {
            success: '/pages',
          },
        }),
      ],
      forms: {
        validation: {
          password: {
            required: true,
            minLength: 4,
            maxLength: 50,
          },
          email: {
            required: true,
          },
        },
        login: formSetting,
      },
    }),
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CamerLocalInterceptor,
      multi: true
    }
  ]
})
export class AppModule {
}
