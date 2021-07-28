import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-lib-reset-pass',
  templateUrl: './lib-reset-pass.component.html',
  styleUrls: ['./lib-reset-pass.component.css']
})
export class LibResetPassComponent implements OnInit {

  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  validationErrors: string[] = [];
  user: User;

  constructor(private accountService: AccountService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.intitializeForm();
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      newpass: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmpass: ['', [Validators.required, this.matchValues('newpass')]]
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null : { isMatching: true }
    }
  }

  changePassword() {
    this.accountService.resetPassword(
      this.registerForm.controls["email"].value,
      this.registerForm.controls["phone"].value,
      this.registerForm.controls["newpass"].value).subscribe(response => {
        this.toastr.success("Reset "+response+"'s password is OK.");
        //this.toastr.info(response.toString());
        //this.router.navigateByUrl('/members');
        this.router.navigateByUrl('/login');
      }, error => {
        this.toastr.error(error.toString());
        //this.validationErrors = error;
      })
  }

  cancel() {
    //this.cancelRegister.emit(false);
    this.router.navigateByUrl('/');
  }
}
