import { Component, OnInit } from '@angular/core';
import { UserInfoService } from '../services/user-info.service';
import { User } from 'generated';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  form: any;
  usersList: User[] = [];

  constructor(private userInfoSvc: UserInfoService) { }

  ngOnInit() {
    this.form = {
      firstName: '',
      lastName: '',
      email: '',
      loginName: '',
      searched: false
    }
  }

  submitForm(event): void {
    console.log('form submitted');
    this.form.searched = true;

    const firstName = this.form.firstName;
    const lastName = this.form.lastName;
    const email = this.form.email;
    const loginName = this.form.loginName;

    this.userInfoSvc.getUsers(firstName, lastName, email, loginName).subscribe((usersDto: any) => {
      this.usersList = usersDto.data;
      console.log(usersDto.data);
    });
  }
}
