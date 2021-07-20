import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LibBook } from '../_models/libBook';
import { LibUser } from '../_models/libUser';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = environment.apiUrl;
  emptyInfo: LibBook;
  constructor(private http: HttpClient) { }
  private currentBookSource = new ReplaySubject<LibUser>(1);
  currentBook$ = this.currentBookSource.asObservable();

  getBookList() {
    return this.http.get<Partial<LibBook[]>>(this.baseUrl + 'book');
  }

  emptyBook() {
    
    this.emptyInfo.id = 0;
    this.emptyInfo.isbn = "";
    this.emptyInfo.title = "";
    this.emptyInfo.author = "";
    this.emptyInfo.origin = "";
    this.emptyInfo.language = "";
    this.emptyInfo.catalogue = "";
    this.emptyInfo.summary = "";
    this.emptyInfo.addtime = new Date();
    this.emptyInfo.publishtime = new Date();
    this.emptyInfo.condition = "";
    this.emptyInfo.photourl = "";
    return this.emptyInfo;
  }
}
