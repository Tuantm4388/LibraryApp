import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { LibBook } from 'src/app/_models/libBook';
import { LibUser } from 'src/app/_models/libUser';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { BookService } from 'src/app/_services/book.service';
import { LibUserService } from 'src/app/_services/lib-user.service';
import { LibDeleteUserComponent } from '../../lib-dialog/lib-delete-user/lib-delete-user.component';


@Component({
  selector: 'app-lib-store-list',
  templateUrl: './lib-store-list.component.html',
  styleUrls: ['./lib-store-list.component.css']
})
export class LibStoreListComponent implements OnInit {

  bookList: Partial<LibBook[]>;
  booksBackup = [];
  bsModalRef: BsModalRef;

  p: Number = 1;
  count: Number = 10;

  keyWord: string = "";
  idKeyWord: string = "";

  constructor(private adminService: AdminService, private modalService: BsModalService,
    private libUserService: LibUserService, private router: Router,
    private bookService: BookService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBookList();
  }

  getBookList() {
    this.bookService.getBookList().subscribe(users => {
      this.bookList = users.sort((a, b) => a.id - b.id);
      this.booksBackup = this.bookList;
    })
  }
  
  searchFunction() {
    if ((this.keyWord && this.keyWord.length > 0) || (this.idKeyWord && this.idKeyWord.length > 0)) {
      //let resulf = this.usersBackup.find(a => a.username.toUpperCase() == this.keyWord.toUpperCase());

      this.bookList = [];
      if (this.keyWord && this.keyWord.length > 0) {
        let resulf = this.booksBackup.filter(a => this.isSearchCompare(a.title, this.keyWord));
        console.log(resulf);
        if (resulf) {
          console.log("searchFunction added name");
          this.bookList = resulf;
        }
      }
      if (this.idKeyWord && this.idKeyWord.length > 0) {
        //this.toastr.info(this.idKeyWord);
        let resulf = this.booksBackup.filter(a => this.isSearchCompare(a.id.toString(), this.idKeyWord));
        //this.toastr.info(resulf.toString());
        console.log(resulf);
        if (resulf) {
          console.log("searchFunction added id");
          for (let item of resulf) {
            var test = this.bookList.find(a => a.id == item.id);
            if (test) { }
            else {
              this.bookList.push(item);
            }
          }
        }
      }
      this.p = 1;
    }
    else {
      this.bookList = this.booksBackup;
      this.p = 1;
    }
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

  /// tablesorter
  sorterId: boolean = true;
  sort_Id() {
    this.sorterId = !this.sorterId;
    if (this.sorterId) {
      this.bookList = this.booksBackup.sort((a, b) => a.id - b.id);
    }
    else {
      this.bookList = this.booksBackup.sort((a, b) => b.id - a.id);
    }
  }

  sorterISBN: boolean = false;
   sort_ISBN() {
     this.sorterISBN = !this.sorterISBN;
     if (this.sorterISBN) {
       this.sortToLow_isbn();
     }
     else {
       this.sortToUp_isbn();
     }
   }
 
   sortToLow_isbn() {
     this.bookList = this.booksBackup.sort(function (a, b) {
       var nameA = a.isbn.toUpperCase(); // ignore upper and lowercase
       var nameB = b.isbn.toUpperCase(); // ignore upper and lowercase
       if (nameA < nameB) {
         return 1;
       }
       if (nameA > nameB) {
         return -1;
       }
       // must be equal
       return 0;
     });
   }
 
   sortToUp_isbn() {
     this.bookList = this.booksBackup.sort(function (a, b) {
       var nameA = a.isbn.toUpperCase(); // ignore upper and lowercase
       var nameB = b.isbn.toUpperCase(); // ignore upper and lowercase
       if (nameA < nameB) {
         return -1;
       }
       if (nameA > nameB) {
         return 1;
       }
       // must be equal
       return 0;
     });
   }

   sorterName: boolean = false;
   sort_Name() {
     this.sorterName = !this.sorterName;
     if (this.sorterName) {
       this.sortToLow_Name();
     }
     else {
       this.sortToUp_Name();
     }
   }
 
   sortToLow_Name() {
     this.bookList = this.booksBackup.sort(function (a, b) {
       var nameA = a.title.toUpperCase(); // ignore upper and lowercase
       var nameB = b.title.toUpperCase(); // ignore upper and lowercase
       if (nameA < nameB) {
         return 1;
       }
       if (nameA > nameB) {
         return -1;
       }
       // must be equal
       return 0;
     });
   }
 
   sortToUp_Name() {
     this.bookList = this.booksBackup.sort(function (a, b) {
       var nameA = a.title.toUpperCase(); // ignore upper and lowercase
       var nameB = b.title.toUpperCase(); // ignore upper and lowercase
       if (nameA < nameB) {
         return -1;
       }
       if (nameA > nameB) {
         return 1;
       }
       // must be equal
       return 0;
     });
   }

   sorterCondition: boolean = false;
   sort_Condition() {
     this.sorterCondition = !this.sorterCondition;
     if (this.sorterCondition) {
       this.sortToLow_Condition();
     }
     else {
       this.sortToUp_Condition();
     }
   }
 
   sortToLow_Condition() {
     this.bookList = this.booksBackup.sort(function (a, b) {
       var nameA = a.condition.toUpperCase(); // ignore upper and lowercase
       var nameB = b.condition.toUpperCase(); // ignore upper and lowercase
       if (nameA < nameB) {
         return 1;
       }
       if (nameA > nameB) {
         return -1;
       }
       // must be equal
       return 0;
     });
   }
 
   sortToUp_Condition() {
     this.bookList = this.booksBackup.sort(function (a, b) {
       var nameA = a.condition.toUpperCase(); // ignore upper and lowercase
       var nameB = b.condition.toUpperCase(); // ignore upper and lowercase
       if (nameA < nameB) {
         return -1;
       }
       if (nameA > nameB) {
         return 1;
       }
       // must be equal
       return 0;
     });
   }

   sorterDate: boolean = false;
   sort_Date() {
     this.sorterDate = !this.sorterDate;
     if (this.sorterDate) {
       this.sortToLow_Date();
     }
     else {
       this.sortToUp_Date();
     }
   }
 
   sortToLow_Date() {
     this.bookList = this.booksBackup.sort(function (a, b) {
       var nameA = a.addtime.toString(); // ignore upper and lowercase
       var nameB = b.addtime.toString(); // ignore upper and lowercase
       if (nameA < nameB) {
         return 1;
       }
       if (nameA > nameB) {
         return -1;
       }
       // must be equal
       return 0;
     });
   }
 
   sortToUp_Date() {
     this.bookList = this.booksBackup.sort(function (a, b) {
       var nameA = a.addtime.toString(); // ignore upper and lowercase
       var nameB = b.addtime.toString(); // ignore upper and lowercase
       if (nameA < nameB) {
         return -1;
       }
       if (nameA > nameB) {
         return 1;
       }
       // must be equal
       return 0;
     });
   }

}
