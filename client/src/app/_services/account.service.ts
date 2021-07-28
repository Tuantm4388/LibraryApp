import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LibPass } from '../_models/libPassword';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          //this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: User) {
    console.log("remember");
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  loginNoRemember(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUserNoRemember(user);
        }
      })
    )
  }

  setCurrentUserNoRemember(user: User) {
    console.log("don't remember");
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    //localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  deleteUser(userId: number) {
    return this.http.post(this.baseUrl + 'account/delete/' + userId, userId);
  }

  changePassword(username: string, passInfo: LibPass) {
    return this.http.post(this.baseUrl + 'account/change-password/' + username + '?oldPass=' + passInfo.oldpass + '&newPass=' + passInfo.newpass, username);
  }

  resetPassword(email: string, phone: string, newpass: string) {
    return this.http.post(this.baseUrl + 'account/reset-pass?email=' + email + '&phone=' + phone + '&newPass=' + newpass, 1);
  }

}
