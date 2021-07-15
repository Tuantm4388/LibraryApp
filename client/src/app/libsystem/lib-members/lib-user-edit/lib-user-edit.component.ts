import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from 'src/app/_services/members.service';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';

import { take } from 'rxjs/operators';


@Component({
  selector: 'app-lib-user-edit',
  templateUrl: './lib-user-edit.component.html',
  styleUrls: ['./lib-user-edit.component.css']
})
export class LibUserEditComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];
  createDate: Date;

  member: Member;
  user: User;

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router, private memberService: MembersService,
    private route: ActivatedRoute) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.loadMember();
    //this.intitializeForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.createDate = new Date();

  }

  loadMember() {
    //this.memberService.getMember(this.user.username).subscribe(member => {
    this.route.data.subscribe(data => {
      //this.member = member;
      this.member = data.member;
      this.intitializeForm();
    })
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      username: [this.member.username, [Validators.required, Validators.minLength(5), Validators.maxLength(16)]],
      emailuser: [this.member.emailuser, [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      idcard: [this.member.idcard, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      phone: [this.member.phone, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: [this.member.address, [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    })
  }

  /*edit() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.toastr.success('Add user successfully');
      this.router.navigateByUrl('/');
    }, error => {
      this.validationErrors = error;
    })
  }*/



  updateMember() {
    this.memberService.updateMember(this.registerForm.value).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      //this.editForm.reset(this.member);
    }, error => {
      this.validationErrors = error;
    })
  }

}
