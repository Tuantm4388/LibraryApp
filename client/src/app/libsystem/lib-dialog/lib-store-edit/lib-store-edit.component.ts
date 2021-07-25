import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LibBook } from 'src/app/_models/libBook';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-lib-store-edit',
  templateUrl: './lib-store-edit.component.html',
  styleUrls: ['./lib-store-edit.component.css']
})
export class LibStoreEditComponent implements OnInit {

  @Input() updateAction = new EventEmitter();
  success: boolean = false;

  typeMessge: number = 1; /* 1 : add book */
  /* 2 : message is warning, have 1 button OK */
  /* 3 : Delete confirm dialog, have 2 button*/
  titleDialog: string = "";

  isCreated = true;
  bookStore: LibBook;

  registerForm: FormGroup;
  minDate: Date;
  validationErrors: string[] = [];

  constructor(public bsModalRef: BsModalRef, public accountService: AccountService,
    private toastr: ToastrService, private fb: FormBuilder, private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.success = false;

    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear());
    if (this.isCreated) {
      this.intitializeFormCreate();
    }
    else {

    }
  }

  intitializeFormCreate() {
    //this.toastr.info("create isbn");
    this.registerForm = this.fb.group({
      Isbn: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Condition: ['', Validators.required]
    })
  }

  clickX() {
    this.updateAction.emit(false);
    this.bsModalRef.hide();
  }

  clickOK() {
    if (this.isCreated) {
      this.addNewBookFunc();
    }
  }

  addNewBookFunc() {
    this.bookService.addNewBook(
      this.registerForm.controls["Isbn"].value,
      this.registerForm.controls["Condition"].value).subscribe(
        () => {
          this.toastr.success("Add book successfully.");
          this.updateAction.emit(true);
          this.bsModalRef.hide();
        }, error => {
          this.toastr.error(error);
          this.updateAction.emit(false);
          this.bsModalRef.hide();
          this.router.navigateByUrl('/book-add');
        }
      );
  }

}
