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
  private currentBookSource = new ReplaySubject<LibBook>(1);
  selectedBook$ = this.currentBookSource.asObservable();

  getBookList() {
    return this.http.get<Partial<LibBook[]>>(this.baseUrl + 'book');
  }

  setSelectedBook(_book: LibBook) {
    localStorage.setItem('book', JSON.stringify(_book));
    this.currentBookSource.next(_book);
  }

  
}
