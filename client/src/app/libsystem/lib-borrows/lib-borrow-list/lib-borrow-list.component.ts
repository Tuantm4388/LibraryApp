import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { LibBook } from 'src/app/_models/libBook';
import { LibBorrow } from 'src/app/_models/libBorrow';
import { LibUser } from 'src/app/_models/libUser';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { BorrowService } from 'src/app/_services/borrow.service';
import { LibUserService } from 'src/app/_services/lib-user.service';
import { LibDeleteUserComponent } from '../../lib-dialog/lib-delete-user/lib-delete-user.component';

@Component({
  selector: 'app-lib-borrow-list',
  templateUrl: './lib-borrow-list.component.html',
  styleUrls: ['./lib-borrow-list.component.css']
})
export class LibBorrowListComponent implements OnInit {

  borrowList: Partial<LibBorrow[]>;
  borrowListBackup = [];
  bsModalRef: BsModalRef;

  p: Number = 1;
  count: Number = 3;

  keyWord: string;

  constructor(private adminService: AdminService, private modalService: BsModalService,
    private libUserService: LibUserService, private router: Router, private borrowService: BorrowService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getBorrowCardList();
  }

  getBorrowCardList() {
    this.borrowService.getBorrowList().subscribe(users => {
      this.borrowList = users.sort((a, b) => b.id - a.id);
      this.borrowListBackup = this.borrowList;
    })
  }

  isShowActBorrowTime(card: LibBorrow) {
    if ((card.states === "borrowed" || (card.states === "returned"))) return true;
    return false;
  }

  searchFunction() {
    if (this.keyWord && this.keyWord.length > 0) {
      //let resulf = this.usersBackup.find(a => a.username.toUpperCase() == this.keyWord.toUpperCase());
      let resulf = this.borrowListBackup.filter(a => this.isSearchCompare(a.iduser.toString(), this.keyWord));
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

  isApproveDisable(card: LibBorrow){
    if(card.states==="reserved") return true;
    return false;
  }

  isBorrowDisable(card: LibBorrow){
    if(card.states==="borrowed") return true;
    return false;
  }

  approveFunc(card: LibBorrow){
    this.toastr.info(card.id.toString());
    this.borrowService.setApprove(card.id).subscribe(()=>{
      this.getBorrowCardList();
    },err=>{
      this.toastr.error(err);
    });
  }

  ///////////////////////////////////////////////
  openDeleteModal(user: LibUser) {
    const config = {
      class: 'modal-dialog-centered',
      initialState: {
        user,
        success: false
      }
    }
    this.bsModalRef = this.modalService.show(LibDeleteUserComponent, config);
    this.bsModalRef.content.updateAction.subscribe(values => {
      if (values) {

      }
    });
  }

  routToEditPage(user: LibUser) {
    this.libUserService.setSelectedUserInfo(user);
    this.router.navigateByUrl('/edituser/' + user.username);
  }

  

  /// tablesorter
  sorterId: boolean = true;
  sort_Id() {
    this.sorterId = !this.sorterId;
    if (this.sorterId) {
      this.borrowList = this.borrowListBackup.sort((a, b) => a.id - b.id);
    }
    else {
      this.borrowList = this.borrowListBackup.sort((a, b) => b.id - a.id);
    }
  }

  sorterName: boolean = true;
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
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.username.toUpperCase(); // ignore upper and lowercase
      var nameB = b.username.toUpperCase(); // ignore upper and lowercase
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
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.username.toUpperCase(); // ignore upper and lowercase
      var nameB = b.username.toUpperCase(); // ignore upper and lowercase
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

  sorterType: boolean = true;
  sort_Type() {
    this.sorterType = !this.sorterType;
    if (this.sorterType) {
      this.sortToLow_Type();
    }
    else {
      this.sortToUp_Type();
    }
  }

  sortToLow_Type() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.roles; // ignore upper and lowercase
      var nameB = b.roles; // ignore upper and lowercase
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

  sortToUp_Type() {
    this.borrowList = this.borrowListBackup.sort(function (a, b) {
      var nameA = a.roles; // ignore upper and lowercase
      var nameB = b.roles; // ignore upper and lowercase
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
