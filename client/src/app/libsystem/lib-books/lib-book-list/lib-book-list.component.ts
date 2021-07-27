import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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
    private infoService: InfoService, private toastr: ToastrService) {
  }



  bookInfo: LibBookInfo;

  pageCur: Number = 1;
  countPage: Number = 6;

  isShowInfo: boolean = false;

  bookStore: Partial<LibBook[]>;
  ngOnInit(): void {
    this.getBookList();
    this.bookService.getBookList().subscribe(store => { this.bookStore = store; });
  }

  bookInfoList: Partial<LibBookInfo[]>;
  bookListBackUp = [];
  getBookList() {
    this.infoService.getIsbnList().subscribe(books => {
      this.bookInfoList = books;
      this.bookListBackUp = this.bookInfoList;
      this.arrBackupSearch = this.bookInfoList;
      this.arrCatalogue = this.getArray_catalogue();
      this.arrCheckStatus_catalogue = this.arrCatalogue;

      this.arrAuthor = this.getArray_author();
      this.arrCheckStatus_author = this.arrAuthor;
      this.arrLanguage = this.getArray_language();
      this.arrCheckStatus_language = this.arrLanguage;
      this.arrOrigin = this.getArray_origin();
      this.arrCheckStatus_origin = this.arrOrigin;
    });
  }

  reloadListFunc(event: boolean) {
    //this.toastr.error("reloadListFunc");
    this.isShowInfo = false;
    this.getBookList();
  }

  getSelectedtBook(_bookInfo: LibBookInfo) {
    this.bookInfo = _bookInfo;
    this.isShowInfo = true;
  }

  keyWord: string = "";
  isShowMenu: boolean = false;
  searchFunction() {
    if (this.keyWord && this.keyWord.length > 0) {
      this.isShowMenu = true;
      this.bookInfoList = [];
      if (this.keyWord && this.keyWord.length > 0) {
        let resulf = this.bookListBackUp.filter(a => this.isSearchCompare(a.title, this.keyWord));
        console.log(resulf);
        if (resulf) {
          console.log("searchFunction added name");
          this.bookInfoList = resulf;
        }

        let resulf_Author = this.bookListBackUp.filter(a => this.isSearchCompare(a.author, this.keyWord));
        //this.toastr.info(resulf.toString());
        console.log(resulf_Author);
        if (resulf_Author) {
          console.log("searchFunction added author");
          for (let item of resulf_Author) {
            var test = this.bookInfoList.find(a => a.id == item.id);
            if (test) { }
            else {
              this.bookInfoList.push(item);
            }
          }
        }
      }
      this.pageCur = 1;
    }
    else {
      this.isShowMenu = false;
      this.bookInfoList = this.bookListBackUp;
      this.pageCur = 1;
    }
    this.arrBackupSearch = this.bookInfoList;
    this.arrCatalogue = this.getArray_catalogue();
    this.arrCheckStatus_catalogue = this.arrCatalogue;

    this.arrAuthor = this.getArray_author();
    this.arrCheckStatus_author = this.arrAuthor;
    this.arrLanguage = this.getArray_language();
    this.arrCheckStatus_language = this.arrLanguage;
    this.arrOrigin = this.getArray_origin();
    this.arrCheckStatus_origin = this.arrOrigin;
  }

  isSearchCompare(_strParent: string, _strChild: string) {
    let strParent: string = _strParent.toLowerCase();
    let strChild: string = _strChild.toLowerCase();
    let a = strParent.indexOf(strChild);
    /*if (a == -1) {
    } else {
    }*/
    if (a > -1) return true;
    return false;
  }

  ////// filter
  //child:string = "";
  arrBackupSearch = [];
  isCheck(check: string, arrCheck: any) {
    if (arrCheck.find(x => x === check) == null) return false;
    return true;
  }

  //catalogue
  arrCatalogue = [];
  arrCheckStatus_catalogue = [];
  getArray_catalogue() {
    let arrCheck = [];
    if (this.bookInfoList.length > 0) {
      arrCheck.push(this.bookInfoList[0].catalogue);
      for (let item of this.bookInfoList) {
        if (arrCheck.find(x => x === item.catalogue) == null)
          arrCheck.push(item.catalogue);
      }
    }
    return arrCheck;
  }

  isShow_Catalogue(event: boolean, check: string) {
    if (event) { // checkbox is checking when clicked, so need romove item to change to no check status
      let store = [];
      store = this.arrCheckStatus_catalogue.filter(x => x != check);
      this.arrCheckStatus_catalogue = store;
    }
    else {
      this.arrCheckStatus_catalogue.push(check);
    }
    this.bookInfoList = this.arrBackupSearch.filter(x => this.isCheck(x.catalogue, this.arrCheckStatus_catalogue));

    if (this.isShowMenu) {
      let backup = [];
      backup = this.bookInfoList;
      this.bookInfoList = backup.filter(x => this.isCheck(x.author, this.arrCheckStatus_author));
      backup = this.bookInfoList;
      this.bookInfoList = backup.filter(x => this.isCheck(x.language, this.arrCheckStatus_language));
      backup = this.bookInfoList;
      this.bookInfoList = backup.filter(x => this.isCheck(x.origin, this.arrCheckStatus_origin));
    }

    this.pageCur = 1;
  }

  //author
  arrAuthor = [];
  arrCheckStatus_author = [];
  getArray_author() {
    let arrCheck = [];
    if (this.bookInfoList.length > 0) {
      arrCheck.push(this.bookInfoList[0].author);
      for (let item of this.bookInfoList) {
        if (arrCheck.find(x => x === item.author) == null)
          arrCheck.push(item.author);
      }
    }
    return arrCheck;
  }

  isShow_author(event: boolean, check: string) {
    if (event) { // checkbox is checking when clicked, so need romove item to change to no check status
      let store = [];
      store = this.arrCheckStatus_author.filter(x => x != check);
      this.arrCheckStatus_author = store;
    }
    else {
      this.arrCheckStatus_author.push(check);
    }

    let backup = [];
    this.bookInfoList = this.arrBackupSearch.filter(x => this.isCheck(x.author, this.arrCheckStatus_author));
    backup = this.bookInfoList;
    this.bookInfoList = backup.filter(x => this.isCheck(x.catalogue, this.arrCheckStatus_catalogue));
    backup = this.bookInfoList;
    this.bookInfoList = backup.filter(x => this.isCheck(x.language, this.arrCheckStatus_language));
    backup = this.bookInfoList;
    this.bookInfoList = backup.filter(x => this.isCheck(x.origin, this.arrCheckStatus_origin));

    this.pageCur = 1;
  }

  //language
  arrLanguage = [];
  arrCheckStatus_language = [];
  getArray_language() {
    let arrCheck = [];
    if (this.bookInfoList.length > 0) {
      arrCheck.push(this.bookInfoList[0].language);
      for (let item of this.bookInfoList) {
        if (arrCheck.find(x => x === item.language) == null)
          arrCheck.push(item.language);
      }
    }
    return arrCheck;
  }

  isShow_language(event: boolean, check: string) {
    if (event) { // checkbox is checking when clicked, so need romove item to change to no check status
      let store = [];
      store = this.arrCheckStatus_language.filter(x => x != check);
      this.arrCheckStatus_language = store;
    }
    else {
      this.arrCheckStatus_language.push(check);
    }

    let backup = [];
    this.bookInfoList = this.arrBackupSearch.filter(x => this.isCheck(x.author, this.arrCheckStatus_author));
    backup = this.bookInfoList;
    this.bookInfoList = backup.filter(x => this.isCheck(x.catalogue, this.arrCheckStatus_catalogue));
    backup = this.bookInfoList;
    this.bookInfoList = backup.filter(x => this.isCheck(x.language, this.arrCheckStatus_language));
    backup = this.bookInfoList;
    this.bookInfoList = backup.filter(x => this.isCheck(x.origin, this.arrCheckStatus_origin));

    this.pageCur = 1;
  }

  //origin
  arrOrigin = [];
  arrCheckStatus_origin = [];
  getArray_origin() {
    let arrCheck = [];
    if (this.bookInfoList.length > 0) {
      arrCheck.push(this.bookInfoList[0].origin);
      for (let item of this.bookInfoList) {
        if (arrCheck.find(x => x === item.origin) == null)
          arrCheck.push(item.origin);
      }
    }
    return arrCheck;
  }

  isShow_origin(event: boolean, check: string) {
    if (event) { // checkbox is checking when clicked, so need romove item to change to no check status
      let store = [];
      store = this.arrCheckStatus_origin.filter(x => x != check);
      this.arrCheckStatus_origin = store;
    }
    else {
      this.arrCheckStatus_origin.push(check);
    }

    let backup = [];
    this.bookInfoList = this.arrBackupSearch.filter(x => this.isCheck(x.author, this.arrCheckStatus_author));
    backup = this.bookInfoList;
    this.bookInfoList = backup.filter(x => this.isCheck(x.catalogue, this.arrCheckStatus_catalogue));
    backup = this.bookInfoList;
    this.bookInfoList = backup.filter(x => this.isCheck(x.language, this.arrCheckStatus_language));
    backup = this.bookInfoList;
    this.bookInfoList = backup.filter(x => this.isCheck(x.origin, this.arrCheckStatus_origin));

    this.pageCur = 1;
  }

}
