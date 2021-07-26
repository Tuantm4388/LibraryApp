import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { LibBook, LibBookInfo } from 'src/app/_models/libBook';
import { BookService } from 'src/app/_services/book.service';
import { AccountService } from 'src/app/_services/account.service';
import { InfoService } from 'src/app/_services/info.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LibMessageComponent } from '../../lib-dialog/lib-message/lib-message.component';

@Component({
  selector: 'app-lib-book-info',
  templateUrl: './lib-book-info.component.html',
  styleUrls: ['./lib-book-info.component.css']
})
export class LibBookInfoComponent implements OnInit {

  @Input() bookInfo: LibBookInfo;
  constructor(private router: Router, private bookService: BookService,
    public accountService: AccountService,
    private modalService: BsModalService,
    private infoService: InfoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  goToRequestBorrow(_book: LibBookInfo) {
    //this.bookService.setSelectedBook(_book);
    this.router.navigateByUrl('/borrow/register/'+_book.id);
  }

  goToCreateISBN() {
    //this.bookService.setSelectedBook(_book);
    this.router.navigateByUrl('/book-add');
  }

  goToEditISBN() {
    //this.toastr.info(this.bookInfo.isbn);
    //this.infoService.setSelectedISBN(this.bookInfo);
    this.router.navigateByUrl('/book-edit/' + this.bookInfo.id);
  }

  @Output() reloadList = new EventEmitter();
  goToDeleteISBN(_bookInfo: LibBookInfo) {
    //this.bookService.setSelectedBook(_book);
    //this.router.navigateByUrl('/book-add');
    this.showDeleteConfirmDialog();
  }

  deleteFunction() {
    this.infoService.deleteISBN(this.bookInfo.id).subscribe(response => {
      this.showMessageSuccessDialog();

    }, error => {
      this.showMessageWarningDialog("some reason");
    });
  }

  bsModalRef: BsModalRef;
  showDeleteConfirmDialog() {
    let messageConfirm: string = "Please confirm for deleting the isbn: " + this.bookInfo.isbn;
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        typeMessge: 3,
        titleDialog: "Delete confirmation",
        titleMessage: "",
        contentMessage: messageConfirm,
        success: false
      }
    }
    this.bsModalRef = this.modalService.show(LibMessageComponent, config);
    this.bsModalRef.content.updateAction.subscribe(value => {
      if (value) {
        // this.toastr.success("ok");
        this.deleteFunction();
      }
    });
  }

  showMessageSuccessDialog() {
    let messageConfirm: string = "The deleting isbn: " + this.bookInfo.isbn + " successful!";
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        typeMessge: 1,
        titleDialog: "Delete success",
        titleMessage: "",
        contentMessage: messageConfirm,
        success: false
      }
    }
    this.bsModalRef = this.modalService.show(LibMessageComponent, config);
    this.bsModalRef.content.updateAction.subscribe(() => {
      this.reloadList.emit();
    });
  }

  showMessageWarningDialog(errorMsg: string) {
    let messageConfirm: string = "The deleting isbn: " + this.bookInfo.isbn + " is failed due to:\n" + errorMsg;
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        typeMessge: 1,
        titleDialog: "Delete success",
        titleMessage: "",
        contentMessage: messageConfirm,
        success: false
      }
    }
    this.bsModalRef = this.modalService.show(LibMessageComponent, config);
  }



}
