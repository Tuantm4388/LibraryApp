import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { LibUser } from '../_models/libUser';

@Injectable({
  providedIn: 'root'
})
export class LibUserService {

  baseUrl = environment.apiUrl;

  private selectedUserSource = new ReplaySubject<LibUser>(1);
  selectedUser$ = this.selectedUserSource.asObservable();


  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles');
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
  }

  setSelectedUserInfo(_user:LibUser){
    //this.selectedUserSource.next(null);
    this.selectedUserSource.next(_user);
  }
}
