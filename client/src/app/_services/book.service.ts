import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LibBook } from '../_models/libBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  baseUrl = environment.apiUrl;
  books: any;
  constructor(private http: HttpClient) { }

  getBookList() {
    return this.http.get<Partial<LibBook[]>>(this.baseUrl + 'book');
  }
}
