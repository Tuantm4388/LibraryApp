import { Component, Input, OnInit } from '@angular/core';
import { LibBook } from 'src/app/_models/libBook';

@Component({
  selector: 'app-lib-book-info',
  templateUrl: './lib-book-info.component.html',
  styleUrls: ['./lib-book-info.component.css']
})
export class LibBookInfoComponent implements OnInit {

  @Input() bookInfo: LibBook;
  constructor() { }

  ngOnInit(): void {
  }

}
