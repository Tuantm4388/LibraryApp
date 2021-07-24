import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LibUser } from 'src/app/_models/libUser';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-lib-message',
  templateUrl: './lib-message.component.html',
  styleUrls: ['./lib-message.component.css']
})
export class LibMessageComponent implements OnInit {

  @Input() updateAction = new EventEmitter();
  success: boolean = false;

  typeMessge:number = 1; /* 1 : message is success, have 1 button OK */
                         /* 2 : message is warning, have 1 button OK */
                          /* 3 : Delete confirm dialog, have 2 button*/
  titleDialog: string = "";
  titleMessage: string = "";
  contentMessage: string = "";

  constructor(public bsModalRef: BsModalRef, public accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.success = false;
  }

  clickX() {
    this.updateAction.emit(false);
    this.bsModalRef.hide();
  }

  clickOK() {
    this.updateAction.emit(true);
    this.bsModalRef.hide();
  }

}
