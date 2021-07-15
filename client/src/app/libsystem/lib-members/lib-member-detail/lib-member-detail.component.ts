import { Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Message } from 'src/app/_models/message';
import { MessageService } from 'src/app/_services/message.service';
import { AccountService } from 'src/app/_services/account.service';
import { User } from 'src/app/_models/user';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-lib-member-detail',
  templateUrl: './lib-member-detail.component.html',
  styleUrls: ['./lib-member-detail.component.css']
})
export class LibMemberDetailComponent implements OnInit {

  @ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  member: Member;
  activeTab: TabDirective;
  messages: Message[] = [];
  modeCurrentUser:boolean = false;
  user:User;
  labelBackBtn:string = "Back";

  constructor( private route: ActivatedRoute, 
    public accountService: AccountService) { 
      this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
    }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.member = data.member;
      
      if(this.member.username == this.user.username){
        this.modeCurrentUser = true;
        this.labelBackBtn= "Back to Main Menu";
      }
      else{
        this.modeCurrentUser = false;
        this.labelBackBtn= "Back";
      }
    })

  }

}
