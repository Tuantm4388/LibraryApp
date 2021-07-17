import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LibBook } from 'src/app/_models/libBook';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { BookService } from 'src/app/_services/book.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lib-home',
  templateUrl: './lib-home.component.html',
  styleUrls: ['./lib-home.component.css']
})
export class LibHomeComponent implements OnInit {

  members: Member[];
  userParams: UserParams;
  user: User;
  genderList = [{ value: 'male', display: 'Males' }, { value: 'female', display: 'Females' }];

  employees=[];

  baseUrl = environment.apiUrl;
  
  constructor(private memberService: MembersService, private http: HttpClient, private bookService:BookService) {
    this.userParams = this.memberService.getUserParams();
    this.employees = [
      { 'username': 3, 'knownAs': 'Clare Cornau', 'phoneno': '(815) 6180492', 'email': 'ccornau0@bigcartel.com', 'age': 9, 'city': 'Somalia' },
      { 'username': 3, 'knownAs': 'Edouard Elsmore', 'phoneno': '(507) 3119958', 'email': 'eelsmore1@goo.gl', 'age': 7, 'city': 'United States' },
      { 'username': 1, 'knownAs': 'Aeriel Elldred', 'phoneno': '(478) 7181722', 'email': 'aelldred2@archive.org', 'age': 9, 'city': 'Russia' },
      { 'username': 4, 'knownAs': 'Abagael Meachem', 'phoneno': '(698) 4411762', 'email': 'ameachem3@columbia.edu', 'age': 9, 'city': 'China' },
      { 'username': 5, 'knownAs': 'Jeremiah Hadwen', 'phoneno': '(345) 6582965', 'email': 'jhadwen4@vkontakte.ru', 'age': 7, 'city': 'Mongolia' },
      { 'username': 6, 'knownAs': 'Rollin Wainscoat', 'phoneno': '(659) 9557733', 'email': 'rwainscoat5@thetimes.co.uk', 'age': 7, 'city': 'Bhutan' },
      { 'username': 7, 'knownAs': 'Micah Braddock', 'phoneno': '(864) 2101861', 'email': 'mbraddock6@yellowbook.com', 'age': 7, 'city': 'Peru' },
      { 'username': 8, 'knownAs': 'Margo', 'phoneno': '(165) 5814372', 'email': 'jcrotty7@opensource.org', 'age': 7, 'city': 'Niger' },
      { 'username': 9, 'knownAs': 'Margo', 'phoneno': '(428) 2282928', 'email': 'mbraker8@yahoo.co.jp', 'age': 9, 'city': 'Argentina' },
      { 'username': 10, 'knownAs': 'Bertie Bosman', 'phoneno': '(673) 5170425', 'email': 'bbosman9@google.co.jp', 'age': 9, 'city': 'Greece' },
      { 'username': 11, 'knownAs': 'Darelle Rowlands', 'phoneno': '(978) 8885907', 'email': 'drowlandsa@slate.com', 'age': 9, 'city': 'Indonesia' },
      { 'username': 12, 'knownAs': 'Neile Keets', 'phoneno': '(956) 9360112', 'email': 'nkeetsb@canalblog.com', 'age': 9, 'city': 'Finland' },
      { 'username': 13, 'knownAs': 'Shari Bussen', 'phoneno': '(240) 7150720', 'email': 'sbussenc@so-net.ne.jp', 'age': 9, 'city': 'Philippines' },
      { 'username': 14, 'knownAs': 'Arron Drivers', 'phoneno': '(416) 4076124', 'email': 'adriversd@com.com', 'age': 7, 'city': 'Bosnia and Herzegovina' },
      { 'username': 15, 'knownAs': 'Carola Balasin', 'phoneno': '(262) 7945277', 'email': 'cbalasine@blogger.com', 'age': 9, 'city': 'Bolivia' },
      { 'username': 16, 'knownAs': 'Clarinda Barrick', 'phoneno': '(501) 3984600', 'email': 'cbarrickf@t-online.de', 'age': 9, 'city': 'China' },
      { 'username': 17, 'knownAs': 'Inglis Treweela', 'phoneno': '(718) 4157883', 'email': 'itreweelag@tripod.com', 'age': 7, 'city': 'Finland' },
      { 'username': 18, 'knownAs': 'Yardley Georgeot', 'phoneno': '(213) 5730967', 'email': 'ygeorgeoth@360.cn', 'age': 7, 'city': 'Portugal' },
      { 'username': 19, 'knownAs': 'Hestia Palffrey', 'phoneno': '(349) 6453938', 'email': 'hpalffreyi@nba.com', 'age': 9, 'city': 'Madagascar' },
      { 'username': 20, 'knownAs': 'Gwendolyn Mordon', 'phoneno': '(474) 3068249', 'email': 'gmordonj@uiuc.edu', 'age': 9, 'city': 'Greece' }
    ];
  }
  
  ngOnInit(): void {
    this.loadMembers();
    this.getBookList();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      
      console.log(this.members.length);
    })
  }

  books: Partial<LibBook[]>;
  getBookList() {
    this.bookService.getBookList().subscribe(books => {
      this.books = books;
    });
  }

}
