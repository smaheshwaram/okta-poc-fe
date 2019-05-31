import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  isAuthenticated: boolean;
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
