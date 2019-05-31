import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAuthenticated: boolean;
  user: any;
  Object: any = Object;
  userClaims: any;

  constructor(public oktaAuth: OktaAuthService) {
  }

  async ngOnInit() {
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.oktaAuth.$authenticationState.subscribe((isAuthenticated: boolean)  => this.isAuthenticated = isAuthenticated);

    this.addUser();
  }

  private async addUser() {
    if (this.isAuthenticated) {
      this.userClaims = await this.oktaAuth.getUser();
    }
  }
}
