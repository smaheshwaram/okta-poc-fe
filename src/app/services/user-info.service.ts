import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserDto, User, UsersApiService } from 'generated';

const mockUsersDto: UserDto = {
  data: [
    {
      loginName: 'johndoe',
      email: 'john@doe.com',
      firstName: 'John',
      lastName: 'Doe'
    },
    {
      loginName: 'alexjohnson',
      email: 'alex@johnson.com',
      firstName: 'Alex',
      lastName: 'Johnson'
    },
    {
      loginName: 'heathermeadows',
      email: 'heather@meadows.com',
      firstName: 'Heather',
      lastName: 'Meadows'
    }
  ] as User[]
};

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  constructor(
    private usersApiSvc: UsersApiService
  ) {}

  getUsers(firstName: string, lastName: string, email: string, loginName: string): Observable<UserDto> {
    return this.usersApiSvc.fetchUsers(firstName, lastName, email, loginName);
    // return of(mockUsersDto);
  }
}
