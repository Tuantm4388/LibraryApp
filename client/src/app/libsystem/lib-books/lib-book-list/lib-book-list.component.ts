import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { LibBook } from 'src/app/_models/libBook';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-lib-book-list',
  templateUrl: './lib-book-list.component.html',
  styleUrls: ['./lib-book-list.component.css']
})
export class LibBookListComponent implements OnInit {

  constructor(private bookService: BookService, private accountService: AccountService) {
  }

  bookInfo: LibBook;

  pageCur: Number = 1;
  countPage: Number = 6;

  isShowInfo: boolean = false;

  ngOnInit(): void {
    this.getBookList();
  }

  books: Partial<LibBook[]>;
  getBookList() {
    this.bookService.getBookList().subscribe(books => {
      this.books = books;
    });
  }

  getSelectedtBook(_bookInfo: LibBook) {
    this.bookInfo = _bookInfo;
    this.isShowInfo = true;
  }

}
