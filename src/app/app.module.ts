import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OktaAuthModule } from '@okta/okta-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './okta/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { NavComponent } from './nav/nav.component';
import { UserGuard } from './guards/user.guard';
import { FormsModule } from '@angular/forms';
import { Configuration } from 'generated';
import { environment } from 'src/environments/environment';

const config = {
  issuer: 'https://naic-app.oktapreview.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  clientId: environment.oktaClientId,
  scope: 'profile email'
};

// Client Secret
// y_v7dSS512DRrLEnU-vxeV0lZHqRC7X-TcsJwmvd

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserSearchComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    OktaAuthModule.initAuth(config),
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: Configuration, useFactory: () => new Configuration({
      basePath: environment.apiBasePath
    })},
    UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
