import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { LibBook } from 'src/app/_models/libBook';
import { LibUser } from 'src/app/_models/libUser';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from 'src/app/_services/book.service';
import { BorrowService } from 'src/app/_services/borrow.service';
import { LibMessageComponent } from '../../lib-dialog/lib-message/lib-message.component';

@Component({
  selector: 'app-lib-borrow-register',
  templateUrl: './lib-borrow-register.component.html',
  styleUrls: ['./lib-borrow-register.component.css']
})
export class LibBorrowRegisterComponent implements OnInit {

  bookInfo: LibBook;
  user: User;

  maxDate: Date;
  minReDate: Date;
  minDate: Date;

  borrowDate: Date;
  returnDate: Date;

  constructor(public bookService: BookService, private toast: ToastrService,
    private accountService: AccountService, private borrowService: BorrowService,
    private modalService: BsModalService, private router: Router) {
    //this.bookInfo = bookService.emptyBook();
    this.bookService.selectedBook$.pipe(take(1)).subscribe(book => this.bookInfo = book);
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    //this.bookInfo = this.bookService.emptyBook();
    //this.bookInfo.isbn = "fdfd";
    //this.getBookList();
    this.borrowDate = new Date();
    this.returnDate = new Date();
    this.minDate = new Date();
    this.minReDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setDate(this.borrowDate.getDate() + 30);
  }

  books: Partial<LibBook[]>;
  getBookList() {
    this.bookService.getBookList().subscribe(books => {
      this.books = books;
    });
  }

  resetLimitReturnDate() {
    this.returnDate = this.borrowDate;
    this.minReDate = this.borrowDate;
    let date: Date = new Date();
    date.setDate(this.borrowDate.getDate() + 30);
    this.maxDate = date;
    //this.toast.info("show");
  }

  addBorrowCard() {
     this.borrowService.addBorrowcard(this.bookInfo.id, this.user.id, this.borrowDate, this.returnDate)
      .subscribe(() => {
        this.showMessageDialog();
      }, error => { this.toast.error(error) });
  }

  bsModalRef: BsModalRef;
  showMessageDialog() {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        typeMessge: 1,
        titleDialog: "Borrow request success",
        titleMessage: "Create borrow request succsess",
        contentMessage: "Please go to librarian with your library card for getting the book!",
        success: false
      }
    }
    this.bsModalRef = this.modalService.show(LibMessageComponent, config);
    this.bsModalRef.content.updateAction.subscribe(() => {
      this.router.navigateByUrl('/book-list');
    });
  }

}
