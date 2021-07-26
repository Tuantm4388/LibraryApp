import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { LibBook } from 'src/app/_models/libBook';
import { LibBorrow } from 'src/app/_models/libBorrow';
import { LibUser } from 'src/app/_models/libUser';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { BorrowService } from 'src/app/_services/borrow.service';
import { LibUserService } from 'src/app/_services/lib-user.service';
import { LibDeleteUserComponent } from '../../lib-dialog/lib-delete-user/lib-delete-user.component';
import { LibMessageComponent } from '../../lib-dialog/lib-message/lib-message.component';

@Component({
  selector: 'app-lib-borrow-history',
  templateUrl: './lib-borrow-history.component.html',
  styleUrls: ['./lib-borrow-history.component.css']
})
export class LibBorrowHistoryComponent implements OnInit {


  borrowList: Partial<LibBorrow[]>;
  borrowListBackup = [];
  bsModalRef: BsModalRef;

  p: Number = 1;
  count: Number = 3;

  keyWord: string;

  member: Member;

  constructor(private route: ActivatedRoute, private adminService: AdminService, private modalService: BsModalService,
    private libUserService: LibUserService, private router: Router, private borrowService: BorrowService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data.member;
      this.getBorrowCardList();
    });
   
  }

  getBorrowCardList() {
    this.borrowService.getBorrowListByUser(this.member.id).subscribe(users => {
      this.borrowList = users.sort((a, b) => b.id - a.id);
      this.borrowListBackup = this.borrowList;
    })
  }

  isShowActBorrowTime(card: LibBorrow) {
    if ((card.states === "borrowed" || (card.states === "returned"))) return true;
    return false;
  }

  isShowActReturnTime(card: LibBorrow) {
    if (card.states === "returned") return true;
    return false;
  }

  searchFunction() {
    if (this.keyWord && this.keyWord.length > 0) {
      //let resulf = this.usersBackup.find(a => a.username.toUpperCase() == this.keyWord.toUpperCase());
      let resulf = this.borrowListBackup.filter(a => this.isSearchCompare(a.titlebook, this.keyWord));
      console.log(resulf);
      this.borrowList = [];
      if (resulf) {
        console.log("searchFunction added");
        this.borrowList = resulf;
      }
      this.p = 1;
    }
    else {
      this.borrowList = this.borrowListBackup;
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

  ///////////////////////////////////////////////

  /// tablesorter

  sorterIdBook: boolean = true;
  sort_IdBook() {
    this.sorterIdBook = !this.sorterIdBook;
    if (this.sorterIdBook) {
      this.borrowList = this.borrowListBackup.sort((a, b) => a.idbook - b.idbook);
    }
    else {
      this.borrowList = this.borrowListBackup.sort((a, b) => b.idbook - a.idbook);
    }
  }

  sorterEstBorrow: boolean = false;
  sorterEstBorrowFunc() {
    this.sorterEstBorrow = !this.sorterEstBorrow;
    if (this.sorterEstBorrow) {
      this.sorterEstBorrowFunc_L();
    }
    else {
      this.sorterEstBorrowFunc_U();
    }
  }

  sorterEstBorrowFunc_L() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.borrowtime.toString(); // ignore upper and lowercase
      var nameB = b.borrowtime.toString(); // ignore upper and lowercase
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

  sorterEstBorrowFunc_U() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.borrowtime.toString(); // ignore upper and lowercase
      var nameB = b.borrowtime.toString(); // ignore upper and lowercase
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

  sorterEstReturn: boolean = false;
  sorterEstReturnFunc() {
    this.sorterEstReturn = !this.sorterEstReturn;
    if (this.sorterEstReturn) {
      this.sorterEstReturnFunc_L();
    }
    else {
      this.sorterEstReturnFunc_U();
    }
  }

  sorterEstReturnFunc_L() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.returntime.toString(); // ignore upper and lowercase
      var nameB = b.returntime.toString(); // ignore upper and lowercase
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

  sorterEstReturnFunc_U() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.returntime.toString(); // ignore upper and lowercase
      var nameB = b.returntime.toString(); // ignore upper and lowercase
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

  sorterActBorrow: boolean = false;
  sorterActBorrowFunc() {
    this.sorterActBorrow = !this.sorterActBorrow;
    if (this.sorterActBorrow) {
      this.sorterActBorrowFunc_L();
    }
    else {
      this.sorterActBorrowFunc_U();
    }
  }

  sorterActBorrowFunc_L() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.actborrowtime.toString(); // ignore upper and lowercase
      var nameB = b.actborrowtime.toString(); // ignore upper and lowercase
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

  sorterActBorrowFunc_U() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.actborrowtime.toString(); // ignore upper and lowercase
      var nameB = b.actborrowtime.toString(); // ignore upper and lowercase
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

  sorterActReturn: boolean = false;
  sorterActReturnFunc() {
    this.sorterActReturn = !this.sorterActReturn;
    if (this.sorterActReturn) {
      this.sorterActReturn_L();
    }
    else {
      this.sorterActReturn_U();
    }
  }

  sorterActReturn_L() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.actreturntime.toString(); // ignore upper and lowercase
      var nameB = b.actreturntime.toString(); // ignore upper and lowercase
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

  sorterActReturn_U() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.actreturntime.toString(); // ignore upper and lowercase
      var nameB = b.actreturntime.toString(); // ignore upper and lowercase
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

  sorterBookISBN: boolean = false;
  sort_ISBN() {
    this.sorterBookISBN = !this.sorterBookISBN;
    if (this.sorterBookISBN) {
      this.sortToLow_ISBN();
    }
    else {
      this.sortToUp_ISBN();
    }
  }

  sortToLow_ISBN() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.isbnname.toUpperCase(); // ignore upper and lowercase
      var nameB = b.isbnname.toUpperCase(); // ignore upper and lowercase
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

  sortToUp_ISBN() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.isbnname.toUpperCase(); // ignore upper and lowercase
      var nameB = b.isbnname.toUpperCase(); // ignore upper and lowercase
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

  sorterBookName: boolean = false;
  sort_BookName() {
    this.sorterBookName = !this.sorterBookName;
    if (this.sorterBookName) {
      this.sortToLow_BookName();
    }
    else {
      this.sortToUp_BookName();
    }
  }

  sortToLow_BookName() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.titlebook.toUpperCase(); // ignore upper and lowercase
      var nameB = b.titlebook.toUpperCase(); // ignore upper and lowercase
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

  sortToUp_BookName() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.titlebook.toUpperCase(); // ignore upper and lowercase
      var nameB = b.titlebook.toUpperCase(); // ignore upper and lowercase
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

  sorterStatus: boolean = false;
  sorterStatusFunc() {
    this.sorterStatus = !this.sorterStatus;
    if (this.sorterStatus) {
      this.sorterStatus_Low();
    }
    else {
      this.sorterStatus_Up();
    }
  }

  sorterStatus_Low() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.states.toUpperCase(); // ignore upper and lowercase
      var nameB = b.states.toUpperCase(); // ignore upper and lowercase
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

  sorterStatus_Up() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.states.toUpperCase(); // ignore upper and lowercase
      var nameB = b.states.toUpperCase(); // ignore upper and lowercase
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
  ///////

}
