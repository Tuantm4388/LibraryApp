import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { LibBook } from 'src/app/_models/libBook';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-lib-borrow-register',
  templateUrl: './lib-borrow-register.component.html',
  styleUrls: ['./lib-borrow-register.component.css']
})
export class LibBorrowRegisterComponent implements OnInit {

  bookInfo: LibBook;
  user:User;

  maxDate: Date;
  minReDate: Date;
  minDate: Date;

  borrowDate: Date;
  returnDate: Date;

  constructor(public bookService: BookService, private toast: ToastrService, private accountService: AccountService) {
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

}
