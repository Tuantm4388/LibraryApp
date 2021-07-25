import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { throwError } from 'rxjs';
import { RolesModalComponent } from 'src/app/modals/roles-modal/roles-modal.component';
import { LibBook } from 'src/app/_models/libBook';
import { LibUser } from 'src/app/_models/libUser';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
import { LibUserService } from 'src/app/_services/lib-user.service';
import { LibDeleteUserComponent } from '../../lib-dialog/lib-delete-user/lib-delete-user.component';

@Component({
  selector: 'app-lib-borrow-list',
  templateUrl: './lib-borrow-list.component.html',
  styleUrls: ['./lib-borrow-list.component.css']
})
export class LibBorrowListComponent implements OnInit {

  users: Partial<LibUser[]>;
  usersBackup = [];
  bsModalRef: BsModalRef;

  p: Number = 1;
  count: Number = 3;

  keyWord: string;

  constructor(private adminService: AdminService, private modalService: BsModalService,
    private libUserService: LibUserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsersWithRoles();
  }

  getUsersWithRoles() {
    this.adminService.getLibUserList().subscribe(users => {
      this.users = users.sort((a, b) => a.id - b.id);
      this.usersBackup = this.users;
    })
  }

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
        let idx = this.users.indexOf(user);
        this.users.splice(idx, 1);
        this.usersBackup.splice(idx, 1);
      }
    });
  }

  routToEditPage(user: LibUser) {
    this.libUserService.setSelectedUserInfo(user);
    this.router.navigateByUrl('/edituser/' + user.username);
  }

  searchFunction() {
    if (this.keyWord && this.keyWord.length > 0) {
      //let resulf = this.usersBackup.find(a => a.username.toUpperCase() == this.keyWord.toUpperCase());
      let resulf = this.usersBackup.filter(a => this.isSearchCompare(a.username, this.keyWord));
      console.log(resulf);
      this.users = [];
      if (resulf) {
        console.log("searchFunction added");
        this.users = resulf;
      }
      this.p = 1;
    }
    else {
      this.users = this.usersBackup;
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
      this.users = this.usersBackup.sort((a, b) => a.id - b.id);
    }
    else {
      this.users = this.usersBackup.sort((a, b) => b.id - a.id);
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
    this.users = this.usersBackup.sort(function (a, b) {
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
    this.users = this.usersBackup.sort(function (a, b) {
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
    this.users = this.usersBackup.sort(function (a, b) {
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
    this.users = this.usersBackup.sort(function (a, b) {
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
