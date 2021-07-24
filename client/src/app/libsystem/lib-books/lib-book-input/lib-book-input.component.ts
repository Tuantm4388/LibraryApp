import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LibBook, LibBookInfo } from 'src/app/_models/libBook';
import { BookService } from 'src/app/_services/book.service';
import { InfoService } from 'src/app/_services/info.service';
import { LibPhotoEditDialogComponent } from '../../lib-dialog/lib-photo-edit-dialog/lib-photo-edit-dialog.component';

@Component({
  selector: 'app-lib-book-input',
  templateUrl: './lib-book-input.component.html',
  styleUrls: ['./lib-book-input.component.css']
})
export class LibBookInputComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  @Input() isCreated = true;
  bookInfo: LibBookInfo;
  bookStore: LibBook;

  registerForm: FormGroup;
  minDate: Date;
  validationErrors: string[] = [];

  photoUrl: string = "./assets/uploadImage.png";
  photoUrlSource: string = "./assets/uploadImage.png";

  constructor(private infoService: InfoService, private toastr: ToastrService,
    private fb: FormBuilder, private router: Router, private modalService: BsModalService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear());
    if (this.isCreated) {
      this.intitializeFormCreate();
    }
    else {
      this.route.data.subscribe(data => {
        this.bookInfo = data.bookInfo;
        this.intitializeFormUpdate();
      });
    }
  }

  intitializeFormCreate() {
    //this.toastr.info("create isbn");
    this.registerForm = this.fb.group({
      Isbn: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Author: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Origin: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Language: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Catalogue: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Summary: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      adddate: [this.minDate, Validators.required],
      publishdate: [this.minDate, Validators.required]
    })
  }

  intitializeFormUpdate() {
    this.minDate = new Date(this.bookInfo.addtime.toString());
    this.minDate.setFullYear(this.minDate.getFullYear());
    this.photoUrl = this.bookInfo.photourl;

    this.registerForm = this.fb.group({
      Isbn: [this.bookInfo.isbn, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Title: [this.bookInfo.title, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Author: [this.bookInfo.author, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Origin: [this.bookInfo.origin, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Language: [this.bookInfo.language, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Catalogue: [this.bookInfo.catalogue, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      Summary: [this.bookInfo.summary, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      adddate: [new Date(this.bookInfo.addtime.toString()), Validators.required],
      publishdate: [new Date(this.bookInfo.publishtime.toString()), Validators.required]
    })

  }


  submitFunc() {
    if (this.isCreated) {
      this.addNewISBN();
    } else {
      this.editISBN();
    }
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

  editISBN() {
    this.infoService.updateISBN(this.bookInfo.id,
      this.registerForm.controls["Isbn"].value,
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

  bsModalRef: BsModalRef;
  selectPhotoUrl() {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        selectUrl: this.photoUrl
      }
    }
    this.bsModalRef = this.modalService.show(LibPhotoEditDialogComponent, config);
    this.bsModalRef.content.updateAction.subscribe(values => {
      //this.toastr.error(values);
      this.photoUrl = values;
    });
  }

}
