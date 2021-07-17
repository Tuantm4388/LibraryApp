import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LibBook } from 'src/app/_models/libBook';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-lib-card-book',
  templateUrl: './lib-card-book.component.html',
  styleUrls: ['./lib-card-book.component.css']
})
export class LibCardBookComponent implements OnInit {

  //@Input() member: Member;
  @Input() book: LibBook;


  constructor(private toastr: ToastrService) {
  }

  ngOnInit(): void {

  }
  clickFunction() {
    this.toastr.info("clicked");
  }
}
