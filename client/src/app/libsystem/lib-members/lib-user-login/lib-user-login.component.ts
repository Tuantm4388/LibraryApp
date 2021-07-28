import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-lib-user-login',
  templateUrl: './lib-user-login.component.html',
  styleUrls: ['./lib-user-login.component.css']
})
export class LibUserLoginComponent implements OnInit {

  model: any = {}

  constructor(public accountService: AccountService, private router: Router, 
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isCheck = false;
    this.isRemember = false;
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/');
    })
  }

  cancelLogin(){
    this.router.navigateByUrl('/')
  }

  forgotPassword(){
    this.router.navigateByUrl('/')
  }

  isCheck:boolean = false;
  isRemember:boolean = false;
  rememberUser(){
    if(this.isCheck) // remember
    {
      this.test = "no remember";
      this.isRemember = false;
    }
    else{ // no remember
      this.test = "remember";
    }
    this.isCheck  = !this.isCheck;
  }

  test:string="";

}
