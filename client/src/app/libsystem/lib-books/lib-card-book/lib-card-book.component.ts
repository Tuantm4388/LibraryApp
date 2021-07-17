import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-lib-card-book',
  templateUrl: './lib-card-book.component.html',
  styleUrls: ['./lib-card-book.component.css']
})
export class LibCardBookComponent implements OnInit {

  @Input() member: Member;
  
  
  constructor(private memberService: MembersService, private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    
  }

  addLike(member: Member) {
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have liked ' + member.knownAs);
    })
  }
}
