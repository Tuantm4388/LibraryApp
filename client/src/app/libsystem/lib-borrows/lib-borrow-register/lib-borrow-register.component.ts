import { Component, OnInit } from '@angular/core';
import { LibBook } from 'src/app/_models/libBook';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-lib-borrow-register',
  templateUrl: './lib-borrow-register.component.html',
  styleUrls: ['./lib-borrow-register.component.css']
})
export class LibBorrowRegisterComponent implements OnInit {

  bookInfo:LibBook;
  constructor(public bookService:BookService) { 
    //this.bookInfo = bookService.emptyBook();
  }

  ngOnInit(): void {
     //this.bookInfo = this.bookService.emptyBook();
     //this.bookInfo.isbn = "fdfd";
     this.getBookList();
  }

  books: Partial<LibBook[]>;
  getBookList() {
    this.bookService.getBookList().subscribe(books => {
      this.books = books;
      this.bookInfo = books.pop();
      //this.bookInfo = this.bookService.emptyBook();
    });
  }


}
