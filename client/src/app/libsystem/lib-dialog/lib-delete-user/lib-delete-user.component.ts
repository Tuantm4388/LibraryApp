import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LibUser } from 'src/app/_models/libUser';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-lib-delete-user',
  templateUrl: './lib-delete-user.component.html',
  styleUrls: ['./lib-delete-user.component.css']
})
export class LibDeleteUserComponent implements OnInit {

  @Input() updateAction = new EventEmitter();
  user: LibUser;
  success:boolean=false;

  constructor(public bsModalRef: BsModalRef, public accountService: AccountService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.success=false;
  }

  updateRoles() {
    //this.updateSelectedRoles.emit(this.roles);
    this.accountService.deleteUser(this.user.id)
                          .subscribe(reponse=>{
                            this.success=true;
                            this.updateAction.emit(this.success);
                            this.bsModalRef.hide();
                          },
                            error=>{
                              this.toastr.error(error);
                          });
  }


}
