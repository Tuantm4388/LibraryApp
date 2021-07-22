import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookService } from 'src/app/_services/book.service';
import { InfoService } from 'src/app/_services/info.service';

@Component({
  selector: 'app-lib-book-input',
  templateUrl: './lib-book-input.component.html',
  styleUrls: ['./lib-book-input.component.css']
})
export class LibBookInputComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();

  registerForm: FormGroup;
  minDate: Date;
  validationErrors: string[] = [];

  photoUrl:string="./assets/book.png";

  constructor(private infoService: InfoService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {

    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear());
    this.intitializeForm();
  }

  intitializeForm() {
    this.registerForm = this.fb.group({
      Isbn: ['', Validators.required],
      Title: ['', Validators.required],
      Author: ['', Validators.required],
      Origin: ['', Validators.required],
      Language: ['', Validators.required],
      Catalogue: ['', Validators.required],
      Summary: ['', Validators.required],
      adddate: [this.minDate, Validators.required],
      publishdate: [this.minDate, Validators.required]
    })
  }


  submitFunc() {
    this.addNewISBN();
  }

  addNewISBN() {
    this.infoService.addNewISBN(this.registerForm.controls["Isbn"].value,
      this.registerForm.controls["Title"].value,
      this.registerForm.controls["Author"].value,
      this.registerForm.controls["Origin"].value,
      this.registerForm.controls["Language"].value,
      this.registerForm.controls["Catalogue"].value,
      this.registerForm.controls["Summary"].value,
      this.registerForm.controls["adddate"].value,
      this.registerForm.controls["publishdate"].value,
      this.photoUrl,
    ).subscribe(response => {
      this.router.navigateByUrl('/book-list');
    }, error => {
      this.validationErrors = error;
      //this.toastr.info(error);
      //this.toastr.error("The isbn is already available");
    })
  }

  cancel() {
    //this.cancelRegister.emit(false);
    this.router.navigateByUrl('/book-list');
  }

}
