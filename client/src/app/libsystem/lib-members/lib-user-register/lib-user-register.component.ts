
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lib-user-register',
  templateUrl: './lib-user-register.component.html',
  styleUrls: ['./lib-user-register.component.css']
})
export class LibUserRegisterComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];
  createDate:Date;

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.createDate = new Date();
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      emailuser: ['', Validators.required],
      idcard: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required,
      Validators.minLength(4), Validators.maxLength(8)]]
    })
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.toastr.success('Add user successfully');
      this.router.navigateByUrl('/');
    }, error => {
      this.validationErrors = error;
    })
  }

}