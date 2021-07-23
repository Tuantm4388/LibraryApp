import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LibBook, LibBookInfo } from 'src/app/_models/libBook';
import { BookService } from 'src/app/_services/book.service';
import { AccountService } from 'src/app/_services/account.service';
import { InfoService } from 'src/app/_services/info.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lib-book-info',
  templateUrl: './lib-book-info.component.html',
  styleUrls: ['./lib-book-info.component.css']
})
export class LibBookInfoComponent implements OnInit {

  @Input() bookInfo: LibBookInfo;
  constructor(private router: Router, private bookService: BookService,
    public accountService: AccountService,
    private infoService: InfoService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

  }

  goToRequestBorrow(_book: LibBookInfo) {
    this.bookService.setSelectedBook(_book);
    this.router.navigateByUrl('/borrow/register');
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

  goToDeleteISBN(_bookInfo: LibBookInfo) {
    //this.bookService.setSelectedBook(_book);
    this.router.navigateByUrl('/book-add');
  }

}
