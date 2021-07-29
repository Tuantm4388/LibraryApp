import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../../../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MembersService } from 'src/app/_services/members.service';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';

import { take } from 'rxjs/operators';
import { LibUser } from 'src/app/_models/libUser';
import { LibUserService } from 'src/app/_services/lib-user.service';
import { AdminService } from 'src/app/_services/admin.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LibUserRolesComponent } from '../../lib-dialog/lib-user-roles/lib-user-roles.component';


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
  userInfo: LibUser;

  usernameBackup: string = "";
  bsModalRef: BsModalRef;
  rolesChange: string[];
  isAdmin: boolean = false;

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router, private memberService: MembersService,
    private route: ActivatedRoute, private libUserService: LibUserService,
    private adminService: AdminService, private modalService: BsModalService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    this.libUserService.selectedUser$.pipe(take(1)).subscribe(user => this.userInfo = user);
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
      this.usernameBackup = this.member.username;
      this.intitializeForm();
      this.rolesChange = this.userInfo.roles;
      if (this.user.username.toLowerCase() === "admin") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
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
    this.memberService.updateMemberInfo(this.registerForm.value, this.usernameBackup).subscribe(() => {
      this.toastr.success('Profile updated successfully');
      //this.editForm.reset(this.member);
      if (this.isAdmin) {
        this.toastr.info('Change user type');
        //this.editForm.reset(this.member);
        this.adminService.updateUserRoles(this.userInfo.username, this.rolesChange).subscribe(() => {
          this.userInfo.roles = this.rolesChange;
        });
      }
    }, error => {
      this.validationErrors = error;
    });
  }

  openRolesModal() {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user: this.userInfo,
        roles: this.getRolesArray(this.userInfo)
      }
    }
    this.bsModalRef = this.modalService.show(LibUserRolesComponent, config);
    this.bsModalRef.content.updateSelectedRoles.subscribe(values => {
      const rolesToUpdate = {
        roles: [...values.filter(el => el.checked === true).map(el => el.name)]
      };
      if (rolesToUpdate) {
        this.rolesChange = [...rolesToUpdate.roles];
        //this.adminService.updateUserRoles(this.userInfo.username, rolesToUpdate.roles).subscribe(() => {
        //this.userInfo.roles = [...rolesToUpdate.roles]
        //})
      }
    })
  }

  private getRolesArray(user: LibUser) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: 'Admin', value: 'Admin' },
      { name: 'Librarian', value: 'Librarian' },
      { name: 'Member', value: 'Member' }
    ];

    availableRoles.forEach(role => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }
      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    })
    return roles;
  }

}
