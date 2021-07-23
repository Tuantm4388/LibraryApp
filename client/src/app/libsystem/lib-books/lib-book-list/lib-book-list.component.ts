import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { LibBook, LibBookInfo } from 'src/app/_models/libBook';
import { AccountService } from 'src/app/_services/account.service';
import { BookService } from 'src/app/_services/book.service';
import { InfoService } from 'src/app/_services/info.service';

@Component({
  selector: 'app-lib-book-list',
  templateUrl: './lib-book-list.component.html',
  styleUrls: ['./lib-book-list.component.css']
})
export class LibBookListComponent implements OnInit {

  constructor(private bookService: BookService, private accountService: AccountService,
              private infoService: InfoService) {
  }

  bookInfo: LibBookInfo;

  pageCur: Number = 1;
  countPage: Number = 6;

  isShowInfo: boolean = false;

  ngOnInit(): void {
    this.getBookList();
  }

  books: Partial<LibBookInfo[]>;
  getBookList() {
    this.infoService.getIsbnList().subscribe(books => {
      this.books = books;
    });
  }

  getSelectedtBook(_bookInfo: LibBookInfo) {
    this.bookInfo = _bookInfo;
    this.isShowInfo = true;
  }

}
