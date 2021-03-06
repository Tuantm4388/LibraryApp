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
    this.isCheck = true;
    this.isRemember = true;
  }

  login() {
    console.log("login : isRemember = "+this.isRemember);
    let _userName:string = this.model.username;
    let _pass:string = this.model.password;
    if(_userName ==="" || _pass ==="")
    {
      this.toastr.info("Please enter login information");
      return;
    }
    if (this.isRemember) {
      console.log("case : isRemember = true");
      this.loginRemember();
    }
    else {
      console.log("case : isRemember = false");
      this.loginNoRemember();
    }
  }

  loginRemember() {
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/');
    }, err=>{
      this.toastr.error("User Name or password is incorrect");
    });
  }

  loginNoRemember() {
    this.accountService.loginNoRemember(this.model).subscribe(response => {
      this.router.navigateByUrl('/');
    }, err=>{
      this.toastr.error("User Name or password is incorrect");
    });
  }

  cancelLogin() {
    this.router.navigateByUrl('/')
  }

  forgotPassword() {
    this.router.navigateByUrl('/reset-pass')
  }

  isCheck: boolean = true;
  isRemember: boolean = true;
  rememberUser() {
    if (this.isCheck) // remember
    {
      this.test = "no remember";
      this.isRemember = false;
    }
    else { // no remember
      this.test = "remember";
      this.isRemember = true;
    }
    this.isCheck = !this.isCheck;
  }

  test: string = "";

}
