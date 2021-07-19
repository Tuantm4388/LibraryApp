import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { LibUser } from 'src/app/_models/libUser';

@Component({
  selector: 'app-lib-user-roles',
  templateUrl: './lib-user-roles.component.html',
  styleUrls: ['./lib-user-roles.component.css']
})
export class LibUserRolesComponent implements OnInit {

  @Input() updateSelectedRoles = new EventEmitter();
  user: LibUser;
  roles: any[];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  updateRoles() {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }

}
