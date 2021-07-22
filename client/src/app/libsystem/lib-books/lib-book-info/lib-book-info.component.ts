import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibBook } from 'src/app/_models/libBook';
import { BookService } from 'src/app/_services/book.service';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-lib-book-info',
  templateUrl: './lib-book-info.component.html',
  styleUrls: ['./lib-book-info.component.css']
})
export class LibBookInfoComponent implements OnInit {

  @Input() bookInfo: LibBook;
  constructor(private router: Router, private bookService: BookService, public accountService: AccountService) { }

  ngOnInit(): void {
    
  }

  goToRequestBorrow(_book: LibBook) {
    this.bookService.setSelectedBook(_book);
    this.router.navigateByUrl('/borrow/register');
  }

  goToCreateISBN() {
    //this.bookService.setSelectedBook(_book);
    this.router.navigateByUrl('/book-add');
  }

}
