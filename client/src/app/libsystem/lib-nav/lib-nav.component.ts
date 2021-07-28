import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../_services/account.service';
import { Observable } from 'rxjs';
import { User } from '../../_models/user';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lib-nav',
  templateUrl: './lib-nav.component.html',
  styleUrls: ['./lib-nav.component.css']
})
export class LibNavComponent implements OnInit {

  model: any = {}

  constructor(public accountService: AccountService, private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.router.navigateByUrl('');
  }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
