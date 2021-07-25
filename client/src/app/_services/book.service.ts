import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LibBook } from '../_models/libBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = environment.apiUrl;
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

  deleteBook(id: number) {
    return this.http.post(this.baseUrl + 'book/delete/' + id, id);
  }

  addNewBook(isbn: string,
    condition: string) {
    return this.http.post(this.baseUrl + 'book/add-book?isbn=' + isbn
      + '&condition=' + condition, 1);
  }

  updateBook(id: number,
    isbn: string,
    condition: string,
    adddate: Date) {
    return this.http.post(this.baseUrl + 'book/update-book?id=' + id
      + '&isbn=' + isbn
      + '&condition=' + condition
      + '&adddate=' + adddate.toJSON(), 1);
  }


}
